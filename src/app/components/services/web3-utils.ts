
class Web3Utils {
    
	public isMetaMaskInstalled() {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  
  }

  public async isMetaMaskConnected() {
    const {ethereum} = window;
    const accounts = await ethereum.request({method: 'eth_accounts'});
    return accounts && accounts.length > 0;
  }
	
}