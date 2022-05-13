export const usePhoto = () => {
    const loadPhoto = async (photo) => {
        const formData = new FormData()
        formData.append("photo", photo)
        try {
            const res = await axios.post("/photos/api/photo", formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            })
            return res
        } catch (e) {
            return e.response
        }
    }
    const getPhotos = async () => {
        try{
            const res = await axios.get("/photos/api/photo")
            return res
        } catch (e) {
            return e.response
        }
    }
    const delPhoto = async id => {
        try{
            const res = await axios.delete(`/photos/api/photo/${id}`)
            return res
        } catch (e) {
            return e.response
        }
    }
    const getPhoto = async id => {
        try{
            const res = await axios.get(`/photos/api/photo/${id}`)
            return res
        } catch (e) {
            return e.response
        }
    }
    const updatePhoto = async (id, name, photo) => {
        try{
            const res = await axios.patch(`/photos/api/photo/${id}`, {
                name,
                photo
            })
            return res
        } catch (e) {
            return e.response
        }
    }

    return {
        loadPhoto,
        getPhotos,
        delPhoto,
        getPhoto,
        updatePhoto
    }
}
