<script>
  const ENV = "";     // product
  // const ENV = "test"; // test
  let APP_ID = "wx9794a29389088d06";
  let BASE_URL = "http://192.168.5.155:9030/acaeva/";
  let NetworkErrorCount = 0;

  if (ENV) {
    // 不为空，测试环境
    APP_ID = "wx7adac863b11d4b75";
    BASE_URL = "http://192.168.5.165:9020/acaeva/";
    // BASE_URL = "http://192.168.8.194:9020/acaeva/";
  } else {
    // 为空，生产环境
    // 生产测试
    // APP_ID = "wx3ccbae5292f30bb1";    // 织育测评
    APP_ID = "wx632cdfedf9c81f57";    // 织育网
    // BASE_URL = "http://192.168.5.155:9030/acaeva/";

    // 真实生产
    // APP_ID = "wx9794a29389088d06";
    BASE_URL = "http://admin-demo.zhiyu365.cn/acaeva/";
  }

  export default {
    ENV,
    APP_ID,
    BASE_URL,
    NetworkErrorCount
  }
</script>
