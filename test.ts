import { useTimesClick } from "./index";

const resFun = useTimesClick((a: number, b: string) => {
    console.log('点击了三次')
}, {
    times: 3
})

resFun(1,'3')



