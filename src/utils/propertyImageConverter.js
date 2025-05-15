import { convertS3UrlToProxyUrl } from './s3UrlConverter';

/**
 * Process a property object to ensure all image URLs use the S3 proxy
 * @param {Object} property - The property object containing image URLs
 * @returns {Object} The property with updated image URLs
 */
export const processPropertyImages = (property) => {
  if (!property) return property;
  
  const processedProperty = { ...property };
  
  // Process featured image
  if (processedProperty.propertyFeaturedImage) {
    processedProperty.propertyFeaturedImage = convertS3UrlToProxyUrl(processedProperty.propertyFeaturedImage);
  }
  
  // Process media array
  if (processedProperty.media && Array.isArray(processedProperty.media)) {
    processedProperty.media = processedProperty.media.map(image => 
      image ? convertS3UrlToProxyUrl(image) : image
    );
  }
  
  // Process developer image
  if (processedProperty.developerImage) {
    processedProperty.developerImage = convertS3UrlToProxyUrl(processedProperty.developerImage);
  }
  
  // Process brochure file
  if (processedProperty.brochureFile) {
    processedProperty.brochureFile = convertS3UrlToProxyUrl(processedProperty.brochureFile);
  }
  
  // Process internal and external galleries
  if (processedProperty.interiorsGallery && Array.isArray(processedProperty.interiorsGallery)) {
    processedProperty.interiorsGallery = processedProperty.interiorsGallery.map(image => 
      image ? convertS3UrlToProxyUrl(image) : image
    );
  }
  
  if (processedProperty.exteriorsGallery && Array.isArray(processedProperty.exteriorsGallery)) {
    processedProperty.exteriorsGallery = processedProperty.exteriorsGallery.map(image => 
      image ? convertS3UrlToProxyUrl(image) : image
    );
  }

  // Image URL on PropertyCard component
  if (processedProperty.imageUrl) {
    processedProperty.imageUrl = convertS3UrlToProxyUrl(processedProperty.imageUrl);
  }
  
  return processedProperty;
};

/**
 * Processes an array of properties to ensure all image URLs use the S3 proxy
 * @param {Array} properties - Array of property objects
 * @returns {Array} Array of properties with updated image URLs
 */
export const processPropertiesImages = (properties) => {
  if (!properties || !Array.isArray(properties)) return properties;
  
  return properties.map(property => processPropertyImages(property));
}; 