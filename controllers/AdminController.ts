import { Request, Response, NextFunction } from 'express';

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, pincode, foodType, email, password, ownerName, phone }  = <CreateVandorInput>req.body;

    const existingVandor = await FindVendor('', email);

    if(existingVandor !== null){
        return res.json({ "message": "A vandor is exist with this email ID"})
    }

    const salt =  await GenerateSalt()
    const userPassword = await GeneratePassword(password, salt);

    const createdVandor =  await Vendor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: userPassword,
        salt: salt,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        lat: 0,
        lng: 0
    })

    return res.json(createdVandor)
}

export const GetVanndors = async (req: Request, res: Response, next: NextFunction) => {
    
    const vendors = await Vendor.find()

    if(vendors !== null){
        return res.json(vendors)
    }

    return res.json({"message": "Vendors data not available"})
    

}
export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => {
    
    const vendorId = req.params.id;

    const vendors = await FindVendor(vendorId);

    if(vendors !== null){
        return res.json(vendors)
    }

    return res.json({"message": "Vendors data not available"})

}