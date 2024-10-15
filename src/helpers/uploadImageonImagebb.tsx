import axios from "axios";

const uploadImage = async (image: any, setImageUrl:any) => {

    console.log('image', image)
    if (image && image.length > 0) {
      const formData = new FormData();
      formData.append('image', image[0]);

      try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, formData);

        
        setImageUrl(response.data.data.url);
        return response.data.data.url;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    }
    return null;
  };

  export default uploadImage