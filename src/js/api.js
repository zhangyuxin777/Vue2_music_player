/**
 * Created by bruce zhang on 2017/3/30.
 */
import Vue from 'vue'

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
    request('http://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', {
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
  albumList (callback, error) {
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
        cmd: 'firstpage',
        page: 0,
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
  singerList (callback, error) {
    request('https://c.y.qq.com/v8/fcg-bin/v8.fcg', {
      params: {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
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
  dissList (callback, error) {
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
        sin: 0,
        ein: 29
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
  mvList (callback, error) {
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
        pageno: 0,
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
        num: 6,
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
    request('https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg', {
      params: {
        nobase64: 1,
        musicid: musicid,
        g_tk: 5381,
        uin: 0,
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
}

