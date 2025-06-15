import swisseph from 'swisseph';
import path from 'path';

// 設定 ephemeris 資料目錄（必須含有 .se1 等檔案）
swisseph.swe_set_ephe_path(path.resolve('./ephe'));

/**
 * 計算 Lilith 的黃道經度
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @param {number} hour - 例如 4.15 表示 4:09 AM
 * @param {boolean} useTrue
 * @returns {Promise<number>} 黃道經度（0°–360°）
 */
export function getLilithLongitude(year, month, day, hour, useTrue = false) {
  return new Promise((resolve, reject) => {
    try {
      const jd = swisseph.swe_julday(year, month, day, hour, swisseph.SE_GREG_CAL);
      const id = useTrue ? swisseph.SE_TRUE_NODE : swisseph.SE_MEAN_APOG;
      const flags = swisseph.SEFLG_SWIEPH;

      swisseph.swe_calc_ut(jd, id, flags, (result) => {
        try {
          if (!result || typeof result.longitude !== 'number') {
            return reject(new Error('swe_calc_ut 計算失敗'));
          }
      
          console.log('🧪 swe_calc_ut 回傳：', result);
          resolve(result.longitude);
        } catch (err) {
          reject(err);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
}