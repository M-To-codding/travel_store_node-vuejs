import { createApp } from './main';

const prepareUrlForRouting = (url) => {
  const { BASE_URL } = process.env;
  return url.startsWith(BASE_URL.replace(/\/$/, '')) ? url.substr(BASE_URL.length) : url;
};

// eslint-disable-next-line consistent-return,no-async-promise-executor
export default (context) => new Promise(async (resolve, reject) => {
  const {
    app,
    router,
  } = await createApp();


  router.push(prepareUrlForRouting(context.url));

  const matchedComponents = router.getMatchedComponents();

  if (!matchedComponents.length) {
    return reject(new Error(404));
  }

  router.onReady(() => {
    // eslint-disable-next-line no-param-reassign
    context.rendered = () => {
      // eslint-disable-next-line no-console
      // console.log(context);
    };
    return resolve(app);
  }, reject);
});
