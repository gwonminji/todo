module.exports = {
    css: {
      loaderOptions: {
        scss: {
          // 이 옵션에 공통 scss 파일을 연결
          additionalData: `
                @import "@/assets/scss/base/reset";
            `,
        },
      },
    },
  };