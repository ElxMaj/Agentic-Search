import React from 'react';
import { motion } from 'framer-motion';
import { File, PlayCircle, Link2, ArrowRight, ShoppingBag, BatteryFull, Monitor, Wifi, Clock, Camera, MessageCircle, HelpCircle } from 'lucide-react';
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
  const isLogitechQuery = query.toLowerCase().includes('webcam') || query.toLowerCase().includes('camera');
  const isBatteryQuery = query.toLowerCase().includes('battery') && query.toLowerCase().includes('drain');
  const isWifiQuery = query.toLowerCase().includes('wifi') || query.toLowerCase().includes('unstable');
  const isComputerSlowQuery = query.toLowerCase().includes('computer') && query.toLowerCase().includes('slow');
  
  const techSupportVideoThumbnail = "/lovable-uploads/ab777ee2-0a85-4640-9dff-adde22694685.png";
  
  const graphicsDocuments: RelatedDocument[] = [
    { id: '1', title: 'Dell Graphics Driver Installation Guide', description: 'Step-by-step instructions for installing the latest graphics drivers for Dell systems.', link: '#' },
    { id: '2', title: 'Optimizing Dell Systems for Gaming Performance', description: 'Best practices for optimizing your Dell computer for gaming and graphics-intensive applications.', link: '#' },
    { id: '3', title: 'Troubleshooting Common Graphics Issues on Dell Laptops', description: 'Solutions for common graphics problems encountered on Dell laptops.', link: '#' }
  ];
  
  const webcamDocuments: RelatedDocument[] = [
    { id: '1', title: 'Logitech Webcam Setup Guide', description: 'Complete setup instructions for all Logitech webcam models.', link: '#' },
    { id: '2', title: 'Logitech Webcam Firmware Updates', description: 'How to update firmware on your Logitech webcam for improved performance.', link: '#' },
    { id: '3', title: 'Resolving Common Webcam Issues', description: 'Solutions for the most frequent Logitech webcam problems.', link: '#' }
  ];
  
  const batteryDocuments: RelatedDocument[] = [
    { id: '1', title: 'Dell Battery Health Management Guide', description: 'Learn how to maintain and optimize your Dell laptop battery health.', link: '#' },
    { id: '2', title: 'Dell Power Manager Documentation', description: 'Comprehensive guide to using Dell Power Manager for battery optimization.', link: '#' },
    { id: '3', title: 'Battery Calibration Instructions', description: 'How to properly calibrate your Dell laptop battery for maximum lifespan.', link: '#' }
  ];
  
  const wifiDocuments: RelatedDocument[] = [
    { id: '1', title: 'Wireless Network Troubleshooting Guide', description: 'Comprehensive approaches to diagnosing and fixing Wi-Fi connectivity issues.', link: '#' },
    { id: '2', title: 'Router Configuration Best Practices', description: 'Optimal settings for reliable and stable wireless connections.', link: '#' },
    { id: '3', title: 'Wi-Fi Driver Update Instructions', description: 'How to properly update wireless adapter drivers on Windows systems.', link: '#' }
  ];
  
  const computerSlowDocuments: RelatedDocument[] = [
    { id: '1', title: 'System Performance Optimization Guide', description: 'Comprehensive approach to speed up Windows computers through software optimization.', link: '#' },
    { id: '2', title: 'Windows Maintenance Checklist', description: 'Regular maintenance tasks to keep your system running smoothly.', link: '#' },
    { id: '3', title: 'Hardware Upgrade Recommendations', description: 'Cost-effective hardware upgrades that improve system performance.', link: '#' }
  ];
  
  const defaultDocuments: RelatedDocument[] = [
    { id: '1', title: 'General Troubleshooting Guide', description: 'Common solutions for hardware and software issues.', link: '#' },
    { id: '2', title: 'User Manuals Library', description: 'Access to all product manuals and guides.', link: '#' }
  ];
  
  const graphicsVideos: RelatedVideo[] = [
    { id: '1', title: 'How to Update Dell Graphics Drivers', duration: '5:24', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' },
    { id: '2', title: 'Dell XPS Graphics Performance Tips', duration: '8:15', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' }
  ];
  
  const webcamVideos: RelatedVideo[] = [
    { id: '1', title: 'Logitech Webcam Setup Tutorial', duration: '4:30', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' },
    { id: '2', title: 'Logitech Webcam Advanced Features', duration: '7:12', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' }
  ];
  
  const batteryVideos: RelatedVideo[] = [
    { id: '1', title: 'Extend Your Dell Laptop Battery Life', duration: '6:18', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' },
    { id: '2', title: 'Dell Power Manager Tutorial', duration: '4:45', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' }
  ];
  
  const wifiVideos: RelatedVideo[] = [
    { id: '1', title: 'Fix Unstable Wi-Fi Connections', duration: '7:22', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' },
    { id: '2', title: 'Wi-Fi Troubleshooting Guide', duration: '9:14', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' }
  ];
  
  const computerSlowVideos: RelatedVideo[] = [
    { id: '1', title: 'Speed Up Your Windows PC', duration: '10:36', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' },
    { id: '2', title: 'Windows Optimization Secrets', duration: '8:49', thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg', link: '#' }
  ];
  
  const defaultVideos: RelatedVideo[] = [
    { id: '1', title: 'Tech Support Basics', duration: '6:45', thumbnail: techSupportVideoThumbnail, link: 'https://youtu.be/s1kElkm5J1k?si=93gzgH63yXgYcEEq' }
  ];
  
  const graphicsProducts: ProductRecommendation[] = [
    { id: '1', name: 'NVIDIA GeForce RTX 3060 Graphics Card', price: '$329.99', description: 'Compatible with Dell XPS desktop systems. Significantly improves graphics performance.', image: 'https://images.nvidia.com/aem-dam/Solutions/geforce/ampere/rtx-3060/geforce-rtx-3060-product-gallery-full-screen-3840-2.jpg', link: '#' },
    { id: '2', name: 'Dell Graphics Performance Bundle', price: '$129.99', description: 'Software suite and optimization tools designed specifically for Dell systems.', image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/black/notebook-xps-15-9530-t-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=402&qlt=100,1&resMode=sharp2&size=402,402&chrss=full', link: '#' },
    { id: '3', name: 'Dell 27" Gaming Monitor - S2721DGF', price: '$399.99', description: 'QHD gaming monitor with 165Hz refresh rate for smooth graphics.', image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/s-series/s2721dgf/global-spi/monitor-s2721dgf-hero-504x350-v2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=402&qlt=100,0&resMode=sharp2&size=402,402', link: '#' }
  ];
  
  const webcamProducts: ProductRecommendation[] = [
    { id: '1', name: 'Logitech C920x HD Pro Webcam', price: '$69.99', description: 'Full HD 1080p video calling and recording with dual mics.', image: 'https://resource.logitech.com/w_800,c_lpad,ar_16:9,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/webcams/c920s/gallery/c920s-gallery-1.png?v=1', link: '#' },
    { id: '2', name: 'Logitech StreamCam', price: '$169.99', description: 'Premium webcam for content creators with smart features.', image: 'https://resource.logitech.com/w_800,c_lpad,ar_16:9,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/webcams/streamcam/gallery/streamcam-gallery-1-graphite.png?v=1', link: '#' },
    { id: '3', name: 'Logitech Brio 4K Pro Webcam', price: '$199.99', description: 'Ultra HD 4K webcam with HDR and Windows Hello support.', image: 'https://resource.logitech.com/w_800,c_lpad,ar_16:9,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/webcams/brio/gallery/brio-gallery-1.png?v=1', link: '#' }
  ];
  
  const batteryProducts: ProductRecommendation[] = [
    { id: '1', name: 'Dell 6-Cell Primary Battery', price: '$129.99', description: 'Genuine Dell replacement battery with extended capacity for longer runtime.', image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/13-3320/global-spi/ng/notebook-latitude-3320-campaign-hero-504x350-ng.psd?fmt=jpg&wid=570&hei=400', link: '#' },
    { id: '2', name: 'Dell Power Companion', price: '$149.99', description: 'Portable power bank specifically designed for Dell laptops with USB-C.', image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/13-3320/global-spi/ng/notebook-latitude-3320-campaign-hero-504x350-ng.psd?fmt=jpg&wid=570&hei=400', link: '#' },
    { id: '3', name: 'Dell Performance Power Plan', price: '$39.99', description: 'Software suite for advanced power management and battery optimization.', image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/13-3320/global-spi/ng/notebook-latitude-3320-campaign-hero-504x350-ng.psd?fmt=jpg&wid=570&hei=400', link: '#' }
  ];
  
  const wifiProducts: ProductRecommendation[] = [
    { id: '1', name: 'NETGEAR Nighthawk Mesh WiFi 6 System', price: '$249.99', description: 'Whole-home mesh WiFi system with advanced features for stable connections.', image: 'https://www.netgear.com/images/Products/Networking/WiFiRouters/RAX80/RAX80_Product_Image_1.png', link: '#' },
    { id: '2', name: 'TP-Link AX3000 PCIe WiFi Card', price: '$49.99', description: 'PCIe WiFi 6 adapter for desktop PCs with external antennas for better reception.', image: 'https://www.tp-link.com/us/product-image/Archer-TX3000E-02.jpg', link: '#' },
    { id: '3', name: 'Dell USB-C to Ethernet Adapter', price: '$39.99', description: 'Reliable wired connection alternative for unstable WiFi scenarios.', image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/latitude-notebooks/13-3320/global-spi/ng/notebook-latitude-3320-campaign-hero-504x350-ng.psd?fmt=jpg&wid=570&hei=400', link: '#' }
  ];
  
  const computerSlowProducts: ProductRecommendation[] = [
    { id: '1', name: 'Samsung 970 EVO Plus 1TB SSD', price: '$119.99', description: 'High-performance NVMe SSD to dramatically improve system responsiveness.', image: 'https://image-us.samsung.com/SamsungUS/home/computing/memory-and-storage/solid-state-drives/pdp/computing-memory-storage-pdp-970-evo-plus-gallery-1.jpg?$product-details-jpg$', link: '#' },
    { id: '2', name: 'Crucial 32GB DDR4 Memory Kit', price: '$129.99', description: 'Memory upgrade to improve multitasking performance and overall speed.', image: 'https://www.crucial.com/content/dam/crucial/dram-products/ballistix-rgb/images/product/best-ddr4-rgb-gaming-memory-background-image-mobile.png', link: '#' },
    { id: '3', name: 'PC Optimization Software Suite', price: '$49.99', description: 'Complete software package for system maintenance and performance tuning.', image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OAgf', link: '#' }
  ];
  
  const defaultProducts: ProductRecommendation[] = [
    { id: '1', name: 'Dell XPS 15 Laptop', price: '$1,499.99', description: 'High-performance laptop with NVIDIA graphics.', image: '/lovable-uploads/b53da895-fe0c-4788-be67-b07907211aaf.png', link: '#' },
    { id: '2', name: 'Logitech MX Master 3 Mouse', price: '$99.99', description: 'Advanced wireless mouse for maximum productivity.', image: '/lovable-uploads/70dc402c-6297-400a-b9b5-16e6dee61286.png', link: '#' }
  ];

  let relatedDocuments: RelatedDocument[] = defaultDocuments;
  let relatedVideos: RelatedVideo[] = defaultVideos;
  let productRecommendations: ProductRecommendation[] = defaultProducts;
  let sectionIcon = <HelpCircle className="mr-2 text-blue-500" size={18} />;
  
  if (isDellGraphicsQuery) {
    relatedDocuments = graphicsDocuments;
    relatedVideos = graphicsVideos;
    productRecommendations = graphicsProducts;
    sectionIcon = <Monitor className="mr-2 text-[#F97316]" size={18} />;
  } else if (isLogitechQuery) {
    relatedDocuments = webcamDocuments;
    relatedVideos = webcamVideos;
    productRecommendations = webcamProducts;
    sectionIcon = <Camera className="mr-2 text-[#E43D59]" size={18} />;
  } else if (isBatteryQuery) {
    relatedDocuments = batteryDocuments;
    relatedVideos = batteryVideos;
    productRecommendations = batteryProducts;
    sectionIcon = <BatteryFull className="mr-2 text-[#538234]" size={18} />;
  } else if (isWifiQuery) {
    relatedDocuments = wifiDocuments;
    relatedVideos = wifiVideos;
    productRecommendations = wifiProducts;
    sectionIcon = <Wifi className="mr-2 text-[#445bc5]" size={18} />;
  } else if (isComputerSlowQuery) {
    relatedDocuments = computerSlowDocuments;
    relatedVideos = computerSlowVideos;
    productRecommendations = computerSlowProducts;
    sectionIcon = <Clock className="mr-2 text-[#9B6C14]" size={18} />;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatedTransition isVisible={true} variant="fadeIn" className="mb-8" delay={0.6}>
      <div className="rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-black mb-6 flex items-center">
          {sectionIcon}
          Related Resources & Recommendations
        </h2>
        
        <div className="space-y-8">
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
