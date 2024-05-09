import { KeypairType } from '@polkadot/util-crypto/types';
import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getBrand } from 'react-native-device-info';

type DeviceInfo = {
  isIos: boolean;
  isAndroid: boolean;
  width: number;
  height: number;
};

export const WIKI_URL = 'https://**/';  //TODO: 替换为ec3的信息
export const PRIVACY_AND_POLICY_URL = 'https://**/privacy-and-security/privacy-policy';
export const TERMS_OF_SERVICE_URL = 'https://**/privacy-and-security/terms-of-service';
export const WEBSITE_URL = '';
export const TELEGRAM_URL = '';
export const TWITTER_URL = '';
export const DISCORD_URL = '';
export const BUTTON_ACTIVE_OPACITY = 0.5;
export const ALLOW_FONT_SCALING = false;
export const HIDE_MODAL_DURATION = 1000;
export const SUBSTRATE_ACCOUNT_TYPE: KeypairType = 'sr25519';
export const EVM_ACCOUNT_TYPE: KeypairType = 'ethereum';
export const DEFAULT_ACCOUNT_TYPES: KeypairType[] = [SUBSTRATE_ACCOUNT_TYPE, EVM_ACCOUNT_TYPE];
const window = Dimensions.get('window');
export const deviceWidth = window.width;
export const deviceHeight = window.height;
export const BOTTOM_BAR_HEIGHT = 60;
export const statusBarHeight = getStatusBarHeight();
export enum BitLengthOption {
  CHAIN_SPEC = 128,
  NORMAL_NUMBERS = 32,
}
export const TOAST_DURATION = getBrand().toLowerCase() === 'xiaomi' ? 5000 : 1500;
export const CELL_COUNT = 6;
export const DEVICE: DeviceInfo = {
  isIos: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  width: deviceWidth,
  height: deviceHeight,
};
export const ALL_KEY = 'all';



export const BLE_DEVICE_DID_ADDR_KEY = '__ble_device_did_addr__'; //支持多设备后, 此字段需要废弃
export const BLE_DEVICE_INIT_TIME_KEY = '__ble_device_init_time__';
export const DEVICE_DATA_PREFIX = '__device_data_prefix__'; //+时间戳   多设备时还需要加上did
export const DEVICE_DATA_CONSUMPTION_PREFIX = '__device_data_consumption_prefix__'; //+时间戳   多设备时还需要加上did
export const DEVICE_REWARD_VALUE_PREFIX = '__device_reward_value_prefix__';  //+round   多设备时还需要加上did
export const DEVICE_REWARD_STATUS_PREFIX = '__device_reward_status_prefix__';  //+round   多设备时还需要加上did
// 生成带有时间戳后缀的常量值
export function generateDeviceDataPrefix(timestamp, did = '') {
  return `${DEVICE_DATA_PREFIX}_${timestamp}${did ? '_' + did : ''}`;
}
// 生成带有时间戳后缀的常量值
export function generateDeviceDataConsumptionPrefix(timestamp, did = '') { //如果timestamp为0表示是设备添加后的第一条记录
  return `${DEVICE_DATA_CONSUMPTION_PREFIX}_v2${timestamp}${did ? '_' + did : ''}`;
}
export function generateDeviceDataConsumptionBAKPrefix(timestamp, did = '') { //通过平常获取的值备份存给下一个最近的零点, 防止服务器上也没有获取到对应的零点值
  return `${DEVICE_DATA_CONSUMPTION_PREFIX}_BAK223456${timestamp}${did ? '_' + did : ''}`;
}
// 生成带有round后缀的常量值
export function generateDeviceRewardValuePrefix(round, did = '') {
  return `${DEVICE_REWARD_VALUE_PREFIX}_${round}${did ? '_' + did : ''}`;
}
// 生成带有round后缀的常量值
export function generateDeviceRewardStatusPrefix(round, did = '') { //false:未领取; true:已经领取
  return `${DEVICE_REWARD_STATUS_PREFIX}_${round}${did ? '_' + did : ''}`;
}
export const DEVICE_MINING_LAST_ROUND_PREFIX = '__device_mining_last_rounds_prefix__';  //  多设备时还需要加上did
// 生成带有did后缀的常量值
export function generateDeviceMiningLastRoundPrefix(did = '') { //最新一次mining的轮次
  return `${DEVICE_MINING_LAST_ROUND_PREFIX}_aa${did ? '_' + did : ''}`;
}
export const DEVICE_GET_REWARD_LAST_ROUND_PREFIX = '__device_get_reward_last_rounds_prefix__';  //  多设备时还需要加上did
// 生成带有did后缀的常量值
export function generateDeviceGetRewardLastRoundPrefix(did = '') {  //最新一次领过奖励的round轮次
  return `${DEVICE_GET_REWARD_LAST_ROUND_PREFIX}_${did ? '_' + did : ''}`;
}


export const DEVICE_COUNT = '__device_count__';  //  设备总数量
export const DEVICE_DID_OF_INDEX_PREFIX = '__device_did_of_index_prefix__';  //  设备
// 生成带有did后缀的常量值
export function generateDeviceDidPrefixOfIndex(index) {  //按编号index获取设备did
  return `${DEVICE_GET_REWARD_LAST_ROUND_PREFIX}_${index}`;
}



//timestamp 毫秒值
// export function calculateRound(timestamp) {
//   const startDateTimestamp = new Date('2024-01-01');
//   // 设置时间为零点
//   startDateTimestamp.setHours(0, 0, 0, 0);
//   const timeDiff = timestamp - startDateTimestamp.getTime();// + 24*60*60*1000; 
//   // const round = Math.floor(timeDiff / (24 * 60 * 60 * 1000)) + 1;  //一天
//   const round = Math.floor(timeDiff / (10 * 60 * 1000)) + 1;  //10分钟
//   return round;
// }
export function calculateRound(timestamp) {
  const startDateTimestamp = new Date('2024-01-01');
    // 设置时间为零点
  startDateTimestamp.setHours(0, 0, 0, 0);
  const timeDiffMinutes = Math.floor((timestamp - startDateTimestamp.getTime()) / (60 * 1000));
  const round = Math.floor(timeDiffMinutes / 10) + 1; // 10分钟对应一个轮次
  return round;
}

// export function calculateTimestampByRound(round) {
//   const startDateTimestamp = new Date('2024-01-01 00:00:00').getTime();
//   const timeDiff = round * (24 * 60 * 60 * 1000) + startDateTimestamp;// + 24*60*60*1000;
//   return timeDiff/1000;
// }
export function calculateTimestampByRound(round) {
  // 获取当前轮次的起始日期
  const startDate = new Date('2024-01-01');
  // 设置时间为零点
  startDate.setHours(0, 0, 0, 0); 
  
  // 计算下一天的日期
  // const nextDayDate = new Date(startDate.getTime() + round * 24 * 60 * 60 * 1000); //一天
  // 设置时间为零点
  // nextDayDate.setHours(0, 0, 0, 0);

  const nextDayDate = new Date(startDate.getTime() + round * 10 * 60 * 1000); //10分钟


  // 返回下一天零点的时间戳
  return nextDayDate.getTime() / 1000;
}


export const formatTimestampToDateTimeString = (timestamp) => {  //timestamp单位为秒
  const date = new Date(timestamp * 1000); // 注意JavaScript中的时间戳是以毫秒为单位的，所以乘以1000转换为毫秒
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并且保证两位数
  const day = date.getDate().toString().padStart(2, '0'); // 保证两位数
  const hours = date.getHours().toString().padStart(2, '0'); // 保证两位数
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 保证两位数
  const seconds = date.getSeconds().toString().padStart(2, '0'); // 保证两位数

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
