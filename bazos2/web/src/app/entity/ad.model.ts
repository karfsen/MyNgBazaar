export class Ad{
    public id:number;
    public title:string;
    public text:string;
    public date:Date;
    public sellerFullName:string;
    public price:number;
    public phoneNumber:string;
    public emailAdress:string;

    constructor(id:number,title:string,text:string,date:Date,sellerFullName:string,price:number,phoneNumber:string,emailAdress:string){
        this.id=id;
        this.title=title;
        this.text=text;
        this.date=date;
        this.sellerFullName=sellerFullName;
        this.price=price;
        this.phoneNumber=phoneNumber;
        this.emailAdress=emailAdress;
    }
}