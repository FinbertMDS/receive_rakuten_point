export default {
    RAKUTEN_USERNAME: process.env.RAKUTEN_USERNAME || '',
    RAKUTEN_PASSWORD: process.env.RAKUTEN_PASSWORD || '',
    LOGIN_PAGE: 'https://grp02.id.rakuten.co.jp/rms/nid/login?service_id=c11',
    WEBSEARCH_SEARCH_PAGE: 'https://websearch.rakuten.co.jp/Web?qt=test&col=OW',
    WEBSEARCH_SEARCH_HOME_PAGE: 'https://websearch.rakuten.co.jp',
    WEBSEARCH_MAX_COUNT: 7,
    WEBSEARCH_PREFIX: '天ぷら',
    KUJI_HOME_PAGE: 'https://kuji.rakuten.co.jp',
    KUJI_DEFAULT_LINK: [
        'https://kuji.rakuten.co.jp/33d38332c2',
        'https://kuji.rakuten.co.jp/14d330d3e0',
        'https://kuji.rakuten.co.jp/9ea32a8dfa',
        'https://kuji.rakuten.co.jp/1243541a35',
        'https://kuji.rakuten.co.jp/f3a3832d0c',
        'https://kuji.rakuten.co.jp/6e7329f994',
        'https://kuji.rakuten.co.jp/18584163d',
        'https://kuji.rakuten.co.jp/889373540e',
    ],
    RAKUTENCARD_HOME_PAGE: 'https://www.rakuten-card.co.jp/e-navi/members/index.xhtml',
    DAY_VIEW_VIDEO_GET_POINT: 20,
    CAMPAIGN_PAGE_LIST: [
        'https://event.rakuten.co.jp/campaign/card/pointday',
        'https://event.rakuten.co.jp/campaign/sports',
        'https://event.rakuten.co.jp/campaign/rank/point',
        'https://event.rakuten.co.jp/group/sbc',
    ],
    DEFAULT_TIMEOUT: 15000,
    DEFAULT_KUJI_PAGE_TIMEOUT: 2 * 60000,
    BANK_LOGIN_PAGE: 'https://www.rakuten-bank.co.jp/present/',
    BANK_RAKUTEN_USERNAME: process.env.BANK_RAKUTEN_USERNAME || '',
    BANK_RAKUTEN_PASSWORD: process.env.BANK_RAKUTEN_PASSWORD || '',
    INFO_SEEK_PAGE: 'https://www.infoseek.co.jp',
    INFO_SEEK_MISSION_PAGE: 'https://www.infoseek.co.jp/mission/list/',
    DEFAULT_READ_ARTICLE_TIME: 10000,
    READ_ARTICLE_MAX_COUNT: 10,
    INFO_SEEK_TAB_NAME: [
        'genre-tab__category-all',
        'genre-tab__category-entertainment',
        'genre-tab__category-poli-soci',
        'genre-tab__category-sports',
        'genre-tab__category-busi-econ',
        'genre-tab__category-world',
        'genre-tab__category-it',
        'genre-tab__category-life',
    ],
    INFO_SEEK_RANKING_PAGE: [
        'https://news.infoseek.co.jp/ranking/',
        'https://news.infoseek.co.jp/ranking/entertainment',
        'https://news.infoseek.co.jp/ranking/poli-soci',
        'https://news.infoseek.co.jp/ranking/sports',
        'https://news.infoseek.co.jp/ranking/busi-econ',
        'https://news.infoseek.co.jp/ranking/world',
        'https://news.infoseek.co.jp/ranking/it',
        'https://news.infoseek.co.jp/ranking/life',
    ],
    INFO_SEEK_MISSION_VISIT_PAGE: 'https://www.infoseek.co.jp/mission/visit',
}
