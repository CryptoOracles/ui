
class UserDetails {

    address: string;
    starkPublicKey: string;

    constructor(address: string, starkPublicKey: string){
        this.address = address;
        this.starkPublicKey = starkPublicKey;
    }

    public isEmtpy(): boolean {
        return !(this.address && this.starkPublicKey);
    }

    public store() {
        localStorage.setItem('WALLET_ADDRESS', this.address);
        localStorage.setItem('STARK_PUBLIC_KEY', this.starkPublicKey);
    }

    public static fromStorage() : any {
        let userAddress = localStorage.getItem('WALLET_ADDRESS')!;
        let userStarkPublicKey = localStorage.getItem('STARK_PUBLIC_KEY')!;

        if(userAddress && userStarkPublicKey) {
            return new UserDetails(userAddress, userStarkPublicKey)
        }
        return null;
    }

}