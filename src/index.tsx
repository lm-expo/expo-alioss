import {
  DeviceEventEmitter,
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

let subscription: EmitterSubscription;

const nativeModuleMissingMessage =
  `The package 'react-native-alioss' native module is unavailable.\n\n` +
  `Make sure you are running a rebuilt Expo dev client or production build instead of Expo Go, ` +
  `then run a clean native rebuild after installing this package.`;

const getAliOssModule = () => {
  const nativeModule = NativeModules.AliOss;

  if (!nativeModule) {
    throw new Error(nativeModuleMissingMessage);
  }

  return nativeModule;
};

type OSSinit = {
  maxRetryCount: number;
  timeoutIntervalForRequest: number;
  timeoutIntervalForResource: number;
};

type OssListOptions = {
  prefix: string;
  marker?: string;
  maxKeys?: string;
  delimiter?: string;
};

//default configuration for OSS Client
const conf: OSSinit = {
  maxRetryCount: 3,
  timeoutIntervalForRequest: 30,
  timeoutIntervalForResource: 24 * 60 * 60,
};

const imageXOssProcess = {
  'x-oss-process': '',
};

let partSize = 128 * 1024;
const mulitpartUploadConfig = {
  partSize: partSize,
};
type AppendType = {
  appendPosition: number;
  contentType: string;
  contentMd5: string;
  contentEncoding: string;
  contentDisposition: string;
};

//appendObject
const appendOptions: AppendType = {
  appendPosition: 0,
  contentType: '',
  contentMd5: '',
  contentEncoding: '',
  contentDisposition: '',
};

const AliyunOSS = {
  //Enable dev mode
  enableDevMode() {
    getAliOssModule().enableDevMode();
  },

  /**
   * Initialize the OSS Client
   * Mode: PlainTextAKSK
   */
  initWithPlainTextAccessKey(
    accessKey: string,
    secretKey: string,
    endPoint: string,
    configuration = conf
  ) {
    getAliOssModule().initWithPlainTextAccessKey(
      accessKey,
      secretKey,
      endPoint,
      configuration
    );
  },

  /**
   * Initialize the OSS Client
   * Mode: ImplementedSigner
   */
  initWithImplementedSigner(
    signature: string,
    accessKey: string,
    endPoint: string,
    configuration = conf
  ) {
    getAliOssModule().initWithImplementedSigner(
      signature,
      accessKey,
      endPoint,
      configuration
    );
  },

  /**
   * Initialize the OSS Client
   * Mode: SecurityToken (STS)
   */
  initWithSecurityToken(
    securityToken: string,
    accessKey: string,
    secretKey: string,
    endPoint: string,
    configuration = conf
  ) {
    getAliOssModule().initWithSecurityToken(
      securityToken,
      accessKey,
      secretKey,
      endPoint,
      configuration
    );
  },

  /**
   * Initialize the OSS Client
   * Server STS
  */
  initWithServerSTS(server: string, endPoint: string, configuration = conf) {
    getAliOssModule().initWithServerSTS(server, endPoint, configuration);
  },

  /**
   * Asynchronously uploading
   */
  asyncUpload(
    bucketName: string,
    objectKey: string,
    filepath: string,
    options = {}
  ): Promise<any> {
    return getAliOssModule().asyncUpload(
      bucketName,
      objectKey,
      filepath,
      options
    );
  },

  /**
   * Asynchronously
   */
  asyncResumableUpload(
    bucketName: string,
    objectKey: string,
    filepath = '',
    options = {}
  ): Promise<any> {
    return getAliOssModule().asyncResumableUpload(
      bucketName,
      objectKey,
      filepath,
      options
    );
  },

  /**
   * Asynchronously asyncAppendObject
   */
  asyncAppendObject(
    bucketName: string,
    objectKey: string,
    filepath: string,
    options = appendOptions
  ): Promise<any> {
    return getAliOssModule().asyncAppendObject(
      bucketName,
      objectKey,
      filepath,
      options
    );
  },

  /**
   * Asynchronously
  */
  initMultipartUpload(bucketName: string, objectKey: string): Promise<any> {
    return getAliOssModule().initMultipartUpload(bucketName, objectKey);
  },

  /**
   * Asynchronously multipartUpload
   */
  multipartUpload(
    bucketName: string,
    objectKey: string,
    uploadId: string,
    filepath = '',
    options = mulitpartUploadConfig
  ): Promise<any> {
    return getAliOssModule().multipartUpload(
      bucketName,
      objectKey,
      uploadId,
      filepath,
      options
    );
  },

  /**
   * Asynchronously listParts
   */
  listParts(
    bucketName: string,
    objectKey: string,
    uploadId: string
  ): Promise<any> {
    return getAliOssModule().listParts(bucketName, objectKey, uploadId);
  },
  /**
   * Asynchronously abortMultipartUpload
   */
  abortMultipartUpload(
    bucketName: string,
    objectKey: string,
    uploadId: string
  ): Promise<any> {
    return getAliOssModule().abortMultipartUpload(
      bucketName,
      objectKey,
      uploadId
    );
  },

  /**
   * Asynchronously downloading
   */
  asyncDownload(
    bucketName: string,
    objectKey: string,
    filepath = '',
    options = imageXOssProcess
  ): Promise<any> {
    return getAliOssModule().asyncDownload(
      bucketName,
      objectKey,
      filepath,
      options
    );
  },

  /*
    asyncListBuckets
    */

  asyncListBuckets(): Promise<any> {
    return getAliOssModule().asyncListBuckets();
  },

  /**
   * Asynchronously getHeadObject
   */

  asyncHeadObject(bucketName: string, objectKey: string): Promise<any> {
    return getAliOssModule().asyncHeadObject(bucketName, objectKey);
  },

  /**
   * Asynchronously getAsyncObjects
   */

  asyncListObjects(bucketName: string, options?: OssListOptions): Promise<any> {
    return getAliOssModule().asyncListObjects(bucketName, options);
  },

  /**
   * Asynchronously asyncCopyObject
   */

  asyncCopyObject(
    srcBucketName: string,
    srcObjectKey: string,
    desBucketName: string,
    destObjectKey: string,
    options: any
  ): Promise<any> {
    return getAliOssModule().asyncCopyObject(
      srcBucketName,
      srcObjectKey,
      desBucketName,
      destObjectKey,
      options
    );
  },

  /**
   * Asynchronously doesObjectExist
   */

  doesObjectExist(bucketName: string, objectKey: string): Promise<any> {
    return getAliOssModule().doesObjectExist(bucketName, objectKey);
  },

  /**
   * Asynchronously asyncDeleteObject
   */

  asyncDeleteObject(bucketName: string, objectKey: string): Promise<any> {
    return getAliOssModule().asyncDeleteObject(bucketName, objectKey);
  },

  /**
   * Asynchronously createBucket
   */
  asyncCreateBucket(
    bucketName: string,
    acl = 'private',
    region: string
  ): Promise<any> {
    return getAliOssModule().asyncCreateBucket(bucketName, acl, region);
  },

  /**
   * Asynchronously getBucketACL
   */
  asyncGetBucketACL(bucketName: string): Promise<any> {
    return getAliOssModule().asyncGetBucketACL(bucketName);
  },

  /**
   * Asynchronously deleteBucket
   */
  asyncDeleteBucket(bucketName: string): Promise<any> {
    return getAliOssModule().asyncDeleteBucket(bucketName);
  },

  /**
   * event listener for native upload/download event
   * @param event one of 'uploadProgress' or 'downloadProgress'
   * @param callback a callback function accepts one params: event
   */
  addEventListener(event: any, callback: any) {
    const RNAliyunEmitter =
      Platform.OS === 'ios'
        ? new NativeEventEmitter(getAliOssModule())
        : DeviceEventEmitter;
    switch (event) {
      case 'uploadProgress':
        subscription = RNAliyunEmitter.addListener('uploadProgress', (e) =>
          callback(e)
        );
        break;
      case 'downloadProgress':
        subscription = RNAliyunEmitter.addListener('downloadProgress', (e) =>
          callback(e)
        );
        break;
      default:
        break;
    }
  },

  /**
   * remove event listener for native upload/download event
   * @param event one of 'uploadProgress' or 'downloadProgress'
   */
  removeEventListener(event: any) {
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
  },
};
export { AliyunOSS };
