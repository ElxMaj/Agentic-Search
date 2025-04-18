
import React from 'react';
import { motion } from 'framer-motion';
import { File, PlayCircle, Link2, ArrowRight, ShoppingBag } from 'lucide-react';
import AnimatedTransition from './AnimatedTransition';
import { useLocation } from 'react-router-dom';

interface RelatedDocument {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface RelatedVideo {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  link: string;
}

interface ProductRecommendation {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  link: string;
}

interface RelatedContentProps {
  isVisible: boolean;
}

const RelatedContent: React.FC<RelatedContentProps> = ({ isVisible }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const isDellGraphicsQuery = query.toLowerCase().includes('dell') && query.toLowerCase().includes('graphics');
  const isLogitechQuery = query.toLowerCase().includes('logitech') && query.toLowerCase().includes('webcam');
  
  const relatedDocuments: RelatedDocument[] = isDellGraphicsQuery 
    ? [
        { id: '1', title: 'Dell Graphics Driver Installation Guide', description: 'Step-by-step instructions for installing the latest graphics drivers for Dell systems.', link: '#' },
        { id: '2', title: 'Optimizing Dell Systems for Gaming Performance', description: 'Best practices for optimizing your Dell computer for gaming and graphics-intensive applications.', link: '#' },
        { id: '3', title: 'Troubleshooting Common Graphics Issues on Dell Laptops', description: 'Solutions for common graphics problems encountered on Dell laptops.', link: '#' }
      ]
    : isLogitechQuery
    ? [
        { id: '1', title: 'Logitech Webcam Setup Guide', description: 'Complete setup instructions for all Logitech webcam models.', link: '#' },
        { id: '2', title: 'Logitech Webcam Firmware Updates', description: 'How to update firmware on your Logitech webcam for improved performance.', link: '#' }
      ]
    : [
        { id: '1', title: 'General Troubleshooting Guide', description: 'Common solutions for hardware and software issues.', link: '#' },
        { id: '2', title: 'User Manuals Library', description: 'Access to all product manuals and guides.', link: '#' }
      ];
  
  // Tech support YouTube video with actual thumbnail
  const techSupportVideoThumbnail = "/lovable-uploads/ab777ee2-0a85-4640-9dff-adde22694685.png";
  
  const relatedVideos: RelatedVideo[] = isDellGraphicsQuery
    ? [
        { id: '1', title: 'How to Update Dell Graphics Drivers', duration: '5:24', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' },
        { id: '2', title: 'Dell XPS Graphics Performance Tips', duration: '8:15', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' }
      ]
    : isLogitechQuery
    ? [
        { id: '1', title: 'Logitech Webcam Setup Tutorial', duration: '4:30', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' },
        { id: '2', title: 'Logitech Webcam Advanced Features', duration: '7:12', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' }
      ]
    : [
        { id: '1', title: 'Tech Support Basics', duration: '6:45', thumbnail: techSupportVideoThumbnail, link: 'https://youtu.be/s1kElkm5J1k?si=93gzgH63yXgYcEEq' }
      ];
      
  const productRecommendations: ProductRecommendation[] = isDellGraphicsQuery
    ? [
        { id: '1', name: 'NVIDIA GeForce RTX 3060 Graphics Card', price: '$329.99', description: 'Compatible with Dell XPS desktop systems. Significantly improves graphics performance.', image: 'https://images.nvidia.com/aem-dam/Solutions/geforce/ampere/rtx-3060/geforce-rtx-3060-product-gallery-full-screen-3840-2.jpg', link: '#' },
        { id: '2', name: 'Dell Graphics Performance Bundle', price: '$129.99', description: 'Software suite and optimization tools designed specifically for Dell systems.', image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/black/notebook-xps-15-9530-t-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=402&qlt=100,1&resMode=sharp2&size=402,402&chrss=full', link: '#' },
        { id: '3', name: 'Dell 27" Gaming Monitor - S2721DGF', price: '$399.99', description: 'QHD gaming monitor with 165Hz refresh rate for smooth graphics.', image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/s-series/s2721dgf/global-spi/monitor-s2721dgf-hero-504x350-v2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=402&qlt=100,0&resMode=sharp2&size=402,402', link: '#' }
      ]
    : isLogitechQuery
    ? [
        { id: '1', name: 'Logitech C920x HD Pro Webcam', price: '$69.99', description: 'Full HD 1080p video calling and recording with dual mics.', image: 'https://resource.logitech.com/w_800,c_lpad,ar_16:9,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/webcams/c920s/gallery/c920s-gallery-1.png?v=1', link: '#' },
        { id: '2', name: 'Logitech StreamCam', price: '$169.99', description: 'Premium webcam for content creators with smart features.', image: 'https://resource.logitech.com/w_800,c_lpad,ar_16:9,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/webcams/streamcam/gallery/streamcam-gallery-1-graphite.png?v=1', link: '#' }
      ]
    : [
        { id: '1', name: 'Dell XPS 15 Laptop', price: '$1,499.99', description: 'High-performance laptop with NVIDIA graphics.', image: '/lovable-uploads/b53da895-fe0c-4788-be67-b07907211aaf.png', link: '#' },
        { id: '2', name: 'Logitech MX Master 3 Mouse', price: '$99.99', description: 'Advanced wireless mouse for maximum productivity.', image: '/lovable-uploads/70dc402c-6297-400a-b9b5-16e6dee61286.png', link: '#' }
      ];

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.6}>
      <div className="rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-black mb-6">Related Resources & Recommendations</h2>
        
        <div className="space-y-8">
          {/* Documents Section */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <File className="mr-2 text-blue-500" size={18} />
              Related Documents
            </h3>
            <div className="space-y-3">
              {relatedDocuments.map((doc) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * parseInt(doc.id) }}
                  className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-1">{doc.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                  <a 
                    href={doc.link} 
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    Read more <ArrowRight size={14} className="ml-1" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Videos Section */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <PlayCircle className="mr-2 text-red-500" size={18} />
              Video Tutorials
            </h3>
            <div className="space-y-3">
              {relatedVideos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * parseInt(video.id) }}
                  className="flex gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="relative flex-shrink-0">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="rounded-md w-[120px] h-[68px] object-cover bg-gray-100" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/120x68?text=Video";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-50 rounded-full p-1">
                        <PlayCircle size={20} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <h4 className="font-medium text-gray-900 text-sm">{video.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{video.duration}</span>
                      <a 
                        href={video.link} 
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch <ArrowRight size={12} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Products Section */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-4 flex items-center">
              <ShoppingBag className="mr-2 text-green-500" size={18} />
              Recommended Products
            </h3>
            <div className="space-y-3">
              {productRecommendations.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * parseInt(product.id) }}
                  className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-[100px] h-[100px] object-contain rounded-md bg-gray-100" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/100x100?text=Product";
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-green-600 font-bold">{product.price}</p>
                    </div>
                    <p className="text-sm text-gray-600 my-2">{product.description}</p>
                    <a 
                      href={product.link} 
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                    >
                      View Product
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default RelatedContent;
