import fs from 'fs'



export const playFunc = (net)=>{
    const request = net.request("https://www.douyin.com")
    request.on('response', (response) => {
        console.log(response.body)
        response.on('data', (data) => {
            // console.log(data.toString())
        })
        response.on('end', () => {
            console.log("end>>",new Date().toDateString())
        })
    })
    request.end()
}
