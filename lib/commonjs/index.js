"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AliyunOSS = void 0;
var _reactNative = require("react-native");
let subscription;
const nativeModuleMissingMessage = `The package 'react-native-alioss' native module is unavailable.\n\n` + `Make sure you are running a rebuilt Expo dev client or production build instead of Expo Go, ` + `then run a clean native rebuild after installing this package.`;
const getAliOssModule = () => {
  const nativeModule = _reactNative.NativeModules.AliOss;
  if (!nativeModule) {
    throw new Error(nativeModuleMissingMessage);
  }
  return nativeModule;
};
//default configuration for OSS Client
const conf = {
  maxRetryCount: 3,
  timeoutIntervalForRequest: 30,
  timeoutIntervalForResource: 24 * 60 * 60
};
const imageXOssProcess = {
  'x-oss-process': ''
};
let partSize = 128 * 1024;
const mulitpartUploadConfig = {
  partSize: partSize
};
//appendObject
const appendOptions = {
  appendPosition: 0,
  contentType: '',
  contentMd5: '',
  contentEncoding: '',
  contentDisposition: ''
};
const AliyunOSS = exports.AliyunOSS = {
  //Enable dev mode
  enableDevMode() {
    getAliOssModule().enableDevMode();
  },
  /**
   * Initialize the OSS Client
   * Mode: PlainTextAKSK
   */
  initWithPlainTextAccessKey(accessKey, secretKey, endPoint, configuration = conf) {
    getAliOssModule().initWithPlainTextAccessKey(accessKey, secretKey, endPoint, configuration);
  },
  /**
   * Initialize the OSS Client
   * Mode: ImplementedSigner
   */
  initWithImplementedSigner(signature, accessKey, endPoint, configuration = conf) {
    getAliOssModule().initWithImplementedSigner(signature, accessKey, endPoint, configuration);
  },
  /**
   * Initialize the OSS Client
   * Mode: SecurityToken (STS)
   */
  initWithSecurityToken(securityToken, accessKey, secretKey, endPoint, configuration = conf) {
    getAliOssModule().initWithSecurityToken(securityToken, accessKey, secretKey, endPoint, configuration);
  },
  /**
   * Initialize the OSS Client
   * Server STS
  */
  initWithServerSTS(server, endPoint, configuration = conf) {
    getAliOssModule().initWithServerSTS(server, endPoint, configuration);
  },
  /**
   * Asynchronously uploading
   */
  asyncUpload(bucketName, objectKey, filepath, options = {}) {
    return getAliOssModule().asyncUpload(bucketName, objectKey, filepath, options);
  },
  /**
   * Asynchronously
   */
  asyncResumableUpload(bucketName, objectKey, filepath = '', options = {}) {
    return getAliOssModule().asyncResumableUpload(bucketName, objectKey, filepath, options);
  },
  /**
   * Asynchronously asyncAppendObject
   */
  asyncAppendObject(bucketName, objectKey, filepath, options = appendOptions) {
    return getAliOssModule().asyncAppendObject(bucketName, objectKey, filepath, options);
  },
  /**
   * Asynchronously
  */
  initMultipartUpload(bucketName, objectKey) {
    return getAliOssModule().initMultipartUpload(bucketName, objectKey);
  },
  /**
   * Asynchronously multipartUpload
   */
  multipartUpload(bucketName, objectKey, uploadId, filepath = '', options = mulitpartUploadConfig) {
    return getAliOssModule().multipartUpload(bucketName, objectKey, uploadId, filepath, options);
  },
  /**
   * Asynchronously listParts
   */
  listParts(bucketName, objectKey, uploadId) {
    return getAliOssModule().listParts(bucketName, objectKey, uploadId);
  },
  /**
   * Asynchronously abortMultipartUpload
   */
  abortMultipartUpload(bucketName, objectKey, uploadId) {
    return getAliOssModule().abortMultipartUpload(bucketName, objectKey, uploadId);
  },
  /**
   * Asynchronously downloading
   */
  asyncDownload(bucketName, objectKey, filepath = '', options = imageXOssProcess) {
    return getAliOssModule().asyncDownload(bucketName, objectKey, filepath, options);
  },
  /*
    asyncListBuckets
    */

  asyncListBuckets() {
    return getAliOssModule().asyncListBuckets();
  },
  /**
   * Asynchronously getHeadObject
   */

  asyncHeadObject(bucketName, objectKey) {
    return getAliOssModule().asyncHeadObject(bucketName, objectKey);
  },
  /**
   * Asynchronously getAsyncObjects
   */

  asyncListObjects(bucketName, options) {
    return getAliOssModule().asyncListObjects(bucketName, options);
  },
  /**
   * Asynchronously asyncCopyObject
   */

  asyncCopyObject(srcBucketName, srcObjectKey, desBucketName, destObjectKey, options) {
    return getAliOssModule().asyncCopyObject(srcBucketName, srcObjectKey, desBucketName, destObjectKey, options);
  },
  /**
   * Asynchronously doesObjectExist
   */

  doesObjectExist(bucketName, objectKey) {
    return getAliOssModule().doesObjectExist(bucketName, objectKey);
  },
  /**
   * Asynchronously asyncDeleteObject
   */

  asyncDeleteObject(bucketName, objectKey) {
    return getAliOssModule().asyncDeleteObject(bucketName, objectKey);
  },
  /**
   * Asynchronously createBucket
   */
  asyncCreateBucket(bucketName, acl = 'private', region) {
    return getAliOssModule().asyncCreateBucket(bucketName, acl, region);
  },
  /**
   * Asynchronously getBucketACL
   */
  asyncGetBucketACL(bucketName) {
    return getAliOssModule().asyncGetBucketACL(bucketName);
  },
  /**
   * Asynchronously deleteBucket
   */
  asyncDeleteBucket(bucketName) {
    return getAliOssModule().asyncDeleteBucket(bucketName);
  },
  /**
   * event listener for native upload/download event
   * @param event one of 'uploadProgress' or 'downloadProgress'
   * @param callback a callback function accepts one params: event
   */
  addEventListener(event, callback) {
    const RNAliyunEmitter = _reactNative.Platform.OS === 'ios' ? new _reactNative.NativeEventEmitter(getAliOssModule()) : _reactNative.DeviceEventEmitter;
    switch (event) {
      case 'uploadProgress':
        subscription = RNAliyunEmitter.addListener('uploadProgress', e => callback(e));
        break;
      case 'downloadProgress':
        subscription = RNAliyunEmitter.addListener('downloadProgress', e => callback(e));
        break;
      default:
        break;
    }
  },
  /**
   * remove event listener for native upload/download event
   * @param event one of 'uploadProgress' or 'downloadProgress'
   */
  removeEventListener(event) {
    switch (event) {
      case 'uploadProgress':
        subscription.remove();
        break;
      case 'downloadProgress':
        subscription.remove();
        break;
      default:
        break;
    }
  }
};
//# sourceMappingURL=index.js.map