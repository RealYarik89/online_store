class DeviceController{
    async create(req, res){
        const {name, price, typeId, brandId, info} = req.body
        const {img} = req.files
    }

    async getAll(req, res){
        
    }
    async getOne(req, res){
        
    }
}

module.exports = new DeviceController()