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

export const WIKI_URL = 'https://docs.subwallet.app/';
export const PRIVACY_AND_POLICY_URL = 'https://docs.subwallet.app/privacy-and-security/privacy-policy';
export const TERMS_OF_SERVICE_URL = 'https://docs.subwallet.app/privacy-and-security/terms-of-service';
export const WEBSITE_URL = 'https://subwallet.app/';
export const TELEGRAM_URL = 'https://t.me/subwallet';
export const TWITTER_URL = 'https://twitter.com/subwalletapp';
export const DISCORD_URL = 'https://discord.com/invite/vPCN4vdB8v';
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



export const BLE_DEVICE_DID_ADDR_KEY = '__ble_device_did_addr__';
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
