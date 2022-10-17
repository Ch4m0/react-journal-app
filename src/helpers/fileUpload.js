

export const fileUpload = async (files) => {
    if (!files) throw new Error("No tenemos un archivo a subir")

    const cloudUrl = 'https://api.cloudinary.com/v1_1/abnersas/upload'

    const formData = new FormData()

    formData.append('file', files)
    formData.append('upload_preset', 'react-journal')

    try {

        const resp = await fetch(cloudUrl, { method: 'POST', body: formData })
        console.log(resp)

        if (!resp.ok) throw new Error('No se pudo subir imagen')

        const cloudResp = await resp.json()

        console.log({ cloudResp })

        return cloudResp.secure_url


    } catch (error) {
        throw new Error(error.message)

    }


}