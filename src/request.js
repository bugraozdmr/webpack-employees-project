export class Requests{
    constructor(url){
        this.url = url;
    }

    async get(){
        const response = await fetch(this.url);
        const responseData = await response.json();

        return responseData;
    }

    async post(data){
        //? data gönderilecek ve bu data json içindeki gibi {} arasında oluyor
        const response = await fetch(this.url,{
            "method" : "POST",
            "body" : JSON.stringify(data),
            "headers":{
                "Content-Type": "application/json; charset=UTF-8" // JSON veri gönderdiğinizi belirtmek için
            }
        });

        const responseData = await response.json();

        return responseData;

    }

    // put request post requeste cok benzer

    async put(data,id){
        //? data gönderilecek ve bu data json içindeki gibi {} arasında oluyor
        const response = await fetch(this.url+`/${id}`,{
            "method" : "PUT",
            "body" : JSON.stringify(data),
            "headers":{
                "Content-Type": "application/json; charset=UTF-8" // JSON veri gönderdiğinizi belirtmek için
            }
        });
        const responseData = await response.json();

        return responseData;

    }

    async delete(id){
        //? data gönderilecek ve bu data json içindeki gibi {} arasında oluyor
        const response = await fetch(this.url + "/" +id,{
            "method" : "DELETE"
            //! veri gönderme yapmayacağımız için burayı kullanmıyoruz
            // "body" : JSON.stringify(data),
            // "headers":{
            //     "Content-Type": "application/json; charset=UTF-8" // JSON veri gönderdiğinizi belirtmek için
            // }
        });
        //* islem basarili olunca bos obje doner gerek yok

        // basarili islem olursa
        return "veri silindi";

    }

    //request tamam
}