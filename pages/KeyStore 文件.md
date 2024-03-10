- 用于存储加密私钥，Keystore 文件通常包含经过加密的私钥和一些其他元数据
- ```json
  {
    "address": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", // 以太坊地址，对应账户的公钥。
    "crypto": { // 加密相关信息
      "cipher": "aes-128-ctr", // 加密算法，
      "ciphertext": "c5e7f63d25a3b3ea8d907974662f848bcff2e741b10c2cc45a77c0d8b6f6a285", // 加密后的私钥
      "cipherparams": { // 初始化向量
        "iv": "3198bcf5b0f902d0b461c9166ac9c9e5"
      },
      "kdf": "scrypt", // 密钥派生函数
      "kdfparams": {
        "dklen": 32,
        "n": 262144,
        "p": 1,
        "r": 8,
        "salt": "0b4e63eeab52c2a2f2743eeb45f9a627"
      },
      "mac": "fd30b09c906cf0ed58e6d809dd6146e126b7dd31d373b2d0cfc5c7423a3f77e6"
    },
    "id": "3198bcf5-b0f9-02d0-b461-c9166ac9c9e5",
    "version": 3
  }
  
  ```