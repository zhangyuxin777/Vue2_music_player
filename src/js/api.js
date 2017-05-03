/**
 * Created by bruce zhang on 2017/3/30.
 */
import Vue from 'vue'
import Common from './rock'
import $ from 'jquery'
let request = function (url, params, callback, error) {
  Vue.http.jsonp(url, params).then(function (response) {
    callback(response)
  }, function (response) {
    if (typeof error === 'function') {
      error(response)
    }
  })
}
export default {
  /***
   * 首页
   */
  firstPage (callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg', {
      params: {
        tpl: 'v12',
        page: 'other',
        rnd: '31103165249343734',
        g_tk: 2079095882,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /***
   * 排行榜列表
   */
  rankList (callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
      params: {
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        _: new Date().getTime()
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /***
   * 排行榜详情
   */
  rankDetail (topid, callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
      params: {
        topid: topid,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /***
   * 专辑列表 所有
   */
  albumList (page, callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/album_library', {
      params: {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        cmd: 'get_album_info',
        page: page,
        pagesize: 20,
        sort: 1,
        language: -1,
        genre: 0,
        year: 1,
        pay: 0,
        type: -1,
        company: -1
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /***
   * 专辑列表 某位歌手
   */
  albumListBySinger (singermid, callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg', {
      params: {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: singermid,
        order: 'time',
        begin: 0,
        num: 6,
        from: 'h5',
        songstatus: 1
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /***
   * 专辑详情
   */
  albumDetail (albummid, callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg', {
      params: {
        albummid: albummid,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /***
   * 歌手列表
   */
  singerList (page, callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/v8.fcg', {
      params: {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: page,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /***
   * 歌手详情 以及热门歌曲
   */
  singerDetail (singermid, callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg', {
      params: {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: singermid,
        order: 'listen',
        begin: 0,
        num: 30,
        from: 'h5',
        songstatus: 1,
        _: new Date().getTime()
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /**
   * 歌单列表  todo  该接口无效
   */
  dissList (page, callback, error) {
    let sin = (page - 1) * 30
    let ein = page * 30 - 1
    request('https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', {
      params: {
        rnd: Math.random(),
        g_tk: 5381,
        jsonpCallback: 'getPlaylist',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        categoryId: 10000000,
        sortId: 5,
        sin: sin,
        ein: ein
      }
    }, callback, error);
  },
  /**
   * 歌单详情 包括歌曲
   */
  dissDetail (dissid, callback, error) {
    request('https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg', {
      params: {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid: dissid,
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        _: new Date().getTime()
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /***
   * mv 列表
   */
  mvList (page, callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/getmv_by_tag', {
      params: {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        utf8: 1,
        type: 2,
        year: 0,
        area: 0,
        tag: 0,
        pageno: page,
        pagecount: 20,
        otype: 'json',
        taglist: 1,
        _: new Date().getTime()
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /***
   * mv 列表 某位歌手的
   */
  mvListBySinger (singermid, callback, error) {
    request('https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg', {
      params: {
        cid: 205360581,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: singermid,
        order: 'listen',
        begin: 0,
        num: 10,
        from: 'h5',
        songstatus: 1
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /**
   * mv 详情
   */
  mvDetail (vid, callback, error) {
    request('https://c.y.qq.com/mv/fcgi-bin/fcg_getmvinfo.fcg', {
      params: {
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        vid: vid,
        _: new Date().getTime()
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /**
   * mv 详情
   */
  mvInfo(vid, callback, error) {
    request('https://h5vv.video.qq.com/getinfo', {
      params: {
        callback: 'tvp_request_getinfo_callback_928847',
        platform: 11001,
        charge: 0,
        otype: 'json',
        ehost: 'https://y.qq.com',
        sphls: 0,
        sb: 1,
        nocache: 0,
        appVer: 'V2.0Build9363',
        vids: vid,
        defaultfmt: 'auto',
        _qv_rmt: 'hTTGAUjyA19465Vb1=',
        _qv_rmt2: '5asX3yB9142120zcQ=',
        sdtfrom: 'v3010',
        _rnd: new Date().getTime()
      }
    }, callback, error);
  },
  /***
   * 相似歌手
   */
  similarSinger (singermid, callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/fcg_v8_simsinger.fcg', {
      params: {
        utf8: 1,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        singer_mid: singermid,
        start: 0,
        num: 6,
        from: 'h5',
        songstatus: 1
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /**
   * 相似歌单
   */
  similarDiss (dissid, callback, error) {
    request('https://c.y.qq.com/musichall/fcgi-bin/fcg_similar_recomm.fcg', {
      params: {
        recomtype: 2,
        dissid: dissid,
        maxnum: 6,
        g_tk: 5381,
        uin: 0,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 0,
        _: new Date().getTime()
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  },
  /***
   * 获取歌词
   */
  getLyric (musicid, callback, error) {
    $.ajax({
      async: true,
      url: 'https://route.showapi.com/213-2?showapi_appid=' + Common.showApi.appId + '&showapi_timestamp=' + Common.dateFormat('yyyyMMddhhmmss') + '&showapi_sign=' + Common.showApi.appSecret + '&musicid=' + musicid,
      type: 'GET',
      success: function (backData) {
        callback(backData);
      },
      error: function (x, y, z) {
        console.log("error!");
        if (typeof error == 'function') {
          error(x, y, z);
        }
      }
    });
  },

  search (word, page, callback, error) {
    request('https://c.y.qq.com/soso/fcgi-bin/client_search_cp', {
      params: {
        ct: 24,
        qqmusic_ver: 'txt.yqq.song',
        t: 0,
        aggr: 1,
        cr: 1,
        catZhida: 1,
        lossless: 0,
        flag_qc: 0,
        p: page,
        n: 20,
        w: word,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
      },
      jsonp: 'jsonpCallback'
    }, callback, error);
  }
}

