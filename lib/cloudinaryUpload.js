"use client"


export default async function cloudinaryUpload(file) {

    if (file === undefined) {
        return;
    }
    console.log(file[0])
    const form = new FormData();
    form.append('file', file[0]);
    form.append('public_id', `euiohqweuiqwheuiqwhuiqwhuiqwh`);
    form.append('upload_preset', 'profile_picture')

    const data = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
            method: 'POST',
            body: form,
        }
    ).then(res => res.json()).catch(e => console.log(e));
    return data.secure_url.toString();
}