"use client"


export default async function cloudinaryUpload(file, info, productid) {

    if (file === undefined) {
        return;
    }
    const form = new FormData();
    form.append('file', file);
    form.append('public_id', `${info.public_id}`);
    form.append('upload_preset', 'profile_picture')

    const data = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
            method: 'POST',
            body: form,
        }
    ).then(res => res.json()).catch(e => console.log(e));
    console.log(data.secure_url, data.public_id, info.email)

    //Send imageUrl to firebase
    await postimage({ imageUrl: data.secure_url, imagePublicId: data.public_id, email: info.email }, 'userImage')
}