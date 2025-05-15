import { toast } from 'react-toastify';
import { 
  setLoading, 
  setError, 
  setCollections, 
  addCollection 
} from '../store/collectionSlice';

// Table name from the provided schema
const TABLE_NAME = 'collection';

/**
 * Fetch all collections
 */
export const fetchCollections = async (dispatch) => {
  dispatch(setLoading(true));
  
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "title" } },
        { Field: { Name: "description" } },
        { Field: { Name: "thumbnails" } },
        { Field: { Name: "item_count" } },
        { Field: { Name: "is_public" } },
        { Field: { Name: "updated_at" } },
        { Field: { Name: "Owner" } }
      ],
      orderBy: [
        {
          field: "updated_at",
          direction: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    
    if (!response || !response.data) {
      throw new Error('No data received from server');
    }
    
    // Transform data to match our application structure
    const collections = response.data.map(collection => {
      // Parse thumbnails from string to array if needed
      let thumbnails = [];
      try {
        if (collection.thumbnails) {
          if (typeof collection.thumbnails === 'string') {
            thumbnails = JSON.parse(collection.thumbnails);
          } else if (Array.isArray(collection.thumbnails)) {
            thumbnails = collection.thumbnails;
          }
        }
      } catch (e) {
        console.error('Error parsing thumbnails:', e);
      }
      
      return {
        ...collection,
        id: collection.Id,
        thumbnails: thumbnails,
        isPublic: collection.is_public,
        itemCount: collection.item_count,
        updatedAt: collection.updated_at
      };
    });
    
    dispatch(setCollections(collections));
    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    toast.error('Failed to load collections');
    dispatch(setError(error.message));
    return [];
  }
};

/**
 * Create a new collection
 */
export const createCollection = async (collectionData, dispatch) => {
  dispatch(setLoading(true));
  
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Convert thumbnails to string if it's an array
    let thumbnailsValue = collectionData.thumbnails || [];
    if (Array.isArray(thumbnailsValue)) {
      thumbnailsValue = JSON.stringify(thumbnailsValue);
    }
    
    const recordData = {
      title: collectionData.title,
      description: collectionData.description,
      thumbnails: thumbnailsValue,
      item_count: 0,
      is_public: collectionData.isPublic,
      updated_at: new Date().toISOString()
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, recordData);
    
    if (!response || !response.success) {
      throw new Error(response?.message || 'Failed to create collection');
    }
    
    // Transform to application format
    const newCollection = {
      ...response.data,
      id: response.data.Id,
      thumbnails: collectionData.thumbnails || [],
      isPublic: response.data.is_public,
      itemCount: response.data.item_count,
      updatedAt: response.data.updated_at
    };
    
    dispatch(addCollection(newCollection));
    toast.success('Collection created successfully!');
    
    return newCollection;
  } catch (error) {
    console.error('Error creating collection:', error);
    toast.error('Failed to create collection');
    dispatch(setError(error.message));
    return null;
  }
};