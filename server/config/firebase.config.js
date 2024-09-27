const admin = require("firebase-admin")

const serviceAccount = {
    type: "service_account",
    project_id: "real-estate-61abd",
    private_key_id: "72dbadda5a08a669620eab8562d7ead5da969d0f",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDPclSTfg7+HZoj\nr9aK5d3HZpvWlYCZ2Yku6vBICUr70zBoi5oyihrl/elUWtp7AeuY3vDO3EAEpel6\n2zn8/0XSdYV6TTc1RyfuL2KTeq+jJES6y0M0rsCuYHohyRR1PjxWM09DcxSIxKXC\na0ZZHgF0PIgtRWzu7aR1dZFUgfh786ucxUnTQQBN0rl6Q65iqaEvOLVT0c8Nrsxz\nDks40y2VntGsJTucozSTdXmc2RnPO2x02djMmxbppIh+dC9IUbUzCyamweLEM34u\nPXelAblgWGbzQ9ViDAwvSXBsU7Yf3lCFCHpeboDNaKYD0t3vQr1k3NniX8l7pnja\nyBbi/J3/AgMBAAECggEARXcB9j/EknhkKKYVf/54NPDZp1H5tcr/4nueiWi/OLNf\n5uo0cM8JMdHEI9Cmj4E1nMOuvH5JW6UZGWA2u07Z2R8sWqdnoMoah2pLppnzHXyk\nHS66avZHpDy/OPgGBzqXZsAYvzvWePPsk71rWaUwFHW+nfY9A4cFRqXfS/6XsB1u\ngqWT7qd4dg+bWi8g+O2tpUUqLpfpD1auEciEWpgbdE2JlfBuI317MJm3671uRTj/\ntKRiXdp2/in5sFoTzEnSA085f4QVA/qIZ21mmbPcbcWFbJ7abyiz6JWdy6raW7zF\nn4/N13jzDaWSb3ra1TnxrLgGiuHuhPrsEVCAV7D+FQKBgQDuNaA2N+UzAK3mHowm\nAkuD+T4lWxttFPjO+Fr62eQxSquPiQJmcJXdZbQiuRB1GVUIv9JNtD0HXWLbaE8P\nJw//wtuSRZaRKDW+qk0TO1C+52TYbtsyzstgv/WraE6kZnnglLnytu93qm/wdZUV\n52Du+eRsLlpvHcEsNKmSt6IC+wKBgQDe8IsHsaVuhsxx3MmVOB7nr3aHmUQkm/4b\nGolvHoG6ZZIJGCop1WmuP06DHP9t3tAOovb6g153COT32ecKjnukCDplQsHG5yBo\nLxIZQ5fQna+WNvK6UFnKPsyoeSwbUtpo4Jgw+mjWHhIWBVoYW1l/t10nrvzWp8RD\nSOa7LjPBzQKBgBoILjv+m8OZHWf6iqJUud/wSwRWEoc3NYGYzoh/a1qfqGQFOwfq\n4dXSGX957fx+Cjbsj5UCT3EQmY8UtR8Yy7zNlKVFiZDPbiAqCEZDwy05qGGmq7m/\ns6YdFEHpIj8BG+yZFEEcEMtpCtaiYuqD4Kn9ESNpZWSjQcsM7kMkYkYlAoGAMUft\nA8NiNV943AaZTPH96usfgXQA2zLcZfNkw/pzZNfFA1ujHmI9nTYDTfpgAFKLnWCq\nxc+6VwfRTXSOnQfIDwd+mRm7qhM3V7BoCMunSIdC5Cq7VzIh1xIwvWEjvdp/y0Uy\nf0krWYGGL/X4539x9kh7QCVvYKfvO4xm7KOW71UCgYBF3xBr80yCv9QKjRK8Cg5L\ndaNvkB0DktYcTr8USyQiKs8zOtajCJxHQeEeXj/C7lnZtgS778wUoEPHkSJ/liTy\nw/4jYBp9/V4Bid8Wqxyx6OkGGL7Lo0v+u8IfkeAnCCR5hS3YWR8gvFya8Swocipg\n75lihzHlpq+g5y+Flw40Tg==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-lqjza@real-estate-61abd.iam.gserviceaccount.com",
    client_id: "104433527091677536720",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lqjza%40real-estate-61abd.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://real-estate-61abd.appspot.com'
})

module.exports = admin