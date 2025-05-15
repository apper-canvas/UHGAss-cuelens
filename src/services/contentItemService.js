import { toast } from 'react-toastify';
import { 
  setLoading, 
  setError, 
  setContentItems, 
  addContentItem, 
  updateContentItem 
} from '../store/contentSlice';

// Table name from the provided schema
const TABLE_NAME = 'content_item';

/**
 * Fetch all content items
 */
export const fetchContentItems = async (dispatch) => {
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
        { Field: { Name: "url" } },
        { Field: { Name: "thumbnail_url" } },
        { Field: { Name: "category" } },
        { Field: { Name: "likes" } },
        { Field: { Name: "comments" } },
        { Field: { Name: "is_saved" } },
        { Field: { Name: "is_liked" } },
        { Field: { Name: "CreatedOn" } },
        { Field: { Name: "Owner" } }
      ],
      orderBy: [
        {
          field: "CreatedOn",
          direction: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords(TABLE_NAME, params);
    
    if (!response || !response.data) {
      throw new Error('No data received from server');
    }
    
    // Transform the data to match our application structure
    const contentItems = response.data.map(item => ({
      ...item,
      thumbnailUrl: item.thumbnail_url,
      categoryId: item.category,
      saved: item.is_saved,
      liked: item.is_liked
    }));
    
    dispatch(setContentItems(contentItems));
    return contentItems;
  } catch (error) {
    console.error('Error fetching content items:', error);
    toast.error('Failed to load content items');
    dispatch(setError(error.message));
    return [];
  }
};

/**
 * Create a new content item
 */
export const createContentItem = async (contentData, dispatch) => {
  dispatch(setLoading(true));
  
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Prepare data for the database
    const recordData = {
      title: contentData.title,
      description: contentData.description,
      url: contentData.url,
      thumbnail_url: contentData.thumbnailUrl,
      category: contentData.categoryId,
      likes: 0,
      comments: 0,
      is_saved: false,
      is_liked: false
    };
    
    const response = await apperClient.createRecord(TABLE_NAME, recordData);
    
    if (!response || !response.success) {
      throw new Error(response?.message || 'Failed to create content item');
    }
    
    const newItem = {
      ...response.data,
      thumbnailUrl: response.data.thumbnail_url,
      categoryId: response.data.category,
      saved: response.data.is_saved,
      liked: response.data.is_liked
    };
    
    dispatch(addContentItem(newItem));
    toast.success('Content added successfully!');
    return newItem;
  } catch (error) {
    console.error('Error creating content item:', error);
    toast.error('Failed to add content');
    dispatch(setError(error.message));
    return null;
  }
};

/**
 * Toggle saved status for a content item
 */
export const toggleSaveContent = async (contentId, currentSavedState, dispatch) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const updateData = {
      Id: contentId,
      is_saved: !currentSavedState
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, updateData);
    
    if (!response || !response.success) {
      throw new Error(response?.message || 'Failed to update saved status');
    }
    
    const updatedItem = {
      ...response.data,
      thumbnailUrl: response.data.thumbnail_url,
      categoryId: response.data.category,
      saved: response.data.is_saved,
      liked: response.data.is_liked
    };
    
    dispatch(updateContentItem(updatedItem));
    
    if (updatedItem.saved) {
      toast.success('Content saved to your collection');
    } else {
      toast.info('Content removed from your collection');
    }
    
    return updatedItem;
  } catch (error) {
    console.error('Error toggling save status:', error);
    toast.error('Failed to update saved status');
    return null;
  }
};

/**
 * Toggle liked status for a content item
 */
export const toggleLikeContent = async (contentId, currentLikedState, currentLikes, dispatch) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Update likes count and liked status
    const newLikesCount = currentLikedState ? currentLikes - 1 : currentLikes + 1;
    
    const updateData = {
      Id: contentId,
      is_liked: !currentLikedState,
      likes: newLikesCount
    };
    
    const response = await apperClient.updateRecord(TABLE_NAME, updateData);
    
    if (!response || !response.success) {
      throw new Error(response?.message || 'Failed to update like status');
    }
    
    const updatedItem = {
      ...response.data,
      thumbnailUrl: response.data.thumbnail_url,
      categoryId: response.data.category,
      saved: response.data.is_saved,
      liked: response.data.is_liked
    };
    
    dispatch(updateContentItem(updatedItem));
    return updatedItem;
  } catch (error) {
    console.error('Error toggling like status:', error);
    toast.error('Failed to update like status');
    return null;
  }
};