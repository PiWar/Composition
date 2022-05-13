export const useUser = () => {
    const searchUser = async val => {
        try{
            const res = await axios.get("/photos/api/user?search=" + val)
            return res
        } catch (e) {
            return e.response
        }
    }
    const sharePhoto = async (photos, id) => {
        try{
            const res = await axios.post(`/photos/api/user/${id}/share`, {
                photos
            })
            return res
        } catch (e) {
            return e.response
        }
    }
    const shareYou = async id => {
        try{
            const res = await axios.get(`/photos/api/user/${id}/photos`)
            return res
        } catch (e) {
            return e.response
        }
    }

    return {
        searchUser,
        sharePhoto,
        shareYou
    }
}
