    function runtime(){
        X = new Date("10/12/2022 13:20:00");
        //实际上是2022年10月11日12:48分，这里取了本站长生日哈哈
        Y = new Date();
        T = (Y.getTime()-X.getTime());
        M = 24*60*60*1000;
        a = T/M;
        A = Math.floor(a);
        b = (a-A)*24;
        B = Math.floor(b);
        c = (b-B)*60;
        C = Math.floor((b-B)*60);
        D = Math.floor((c-C)*60);
        span.innerHTML = "已稳定运行: "+A+"天"+B+"小时"+C+"分"+D+"秒"
    }
    setInterval(runtime, 1000);
