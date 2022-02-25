
export class UserDetails {

    address: string;

    constructor(address: string){
        this.address = address;
    }

    public isEmtpy(): boolean {
        return !(this.address);
    }

    public store() {
        localStorage.setItem('WALLET_ADDRESS', this.address);
    }

    public clearStorage() {
        localStorage.removeItem('WALLET_ADDRESS');
    }

    public static fromStorage() : any {
        let userAddress = localStorage.getItem('WALLET_ADDRESS')!;

        if(userAddress) {
            return new UserDetails(userAddress)
        }
        return null;
    }

}