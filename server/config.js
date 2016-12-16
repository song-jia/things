// 各种key只限于开发使用，生产环境中需要重新生成key！！
let config = {}
if (process.env.NODE_ENV === 'test') {
  config = {
    JWT_KEY: 'P4G/)37$4qFiLj:=-xPu)Q6)uW-} >;Y2!YPp.;0D6yb/a.G>Uw2R0iH`ED3+-%t',
    DB_URL: 'localhost/things-test',
    LISTEN_PORT: 5001
  }
} else {
  config = {
    JWT_KEY: 'P4G/)37$4qFiLj:=-xPu)Q6)uW-} >;Y2!YPp.;0D6yb/a.G>Uw2R0iH`ED3+-%t',
    DB_URL: 'localhost/things',
    LISTEN_PORT: 5000
    // SECURE_AUTH_KEY: 'YKbsoDio.p+lbbu>v(>>P9mR*joAJ}wc2|7@V3lBmMWii-+6=z]xWzVbT7LI cG#',
    // LOGGED_IN_KEY: '+=-ZU^.j$I>zPzUY/{Gn}+=4E+8nwUJX)PO*;<u)r.&yKvxiW80$a.8NAo&lM?9E',
    // NONCE_KEY: '-Y|b+|loTs(se&6p|pQ_2+%~tm?GLra!}jwJ)g(/xp*df~jX+KeT)I-OR6YxIGq@',
    // AUTH_SALT: 'i+foTDO]j+)d&Tbl$h)K!|+H:njL|kz%DlLz7JAVik8y|Hw|Go@S0D(Ey0MhlLod',
    // SECURE_AUTH_SALT: 'x01~kAFD/{|ARIrEpG4Gwd5ohJwMjTIdOuQBzB8(k@^1]Yc7ylmR&la9&2Vm#UKH',
    // LOGGED_IN_SALT: '#g6 bqssq!a|l87|<@/+)Z=Ysy/}t%f>`@sK@qf~Y&!QBNmf<koh13i?UU;Gg-K9',
    // NONCE_SALT: 'v9!)e)X8lf(JMk*qL3>0>_Irz- $vvtA[<suz5|2f3r:iUHeb|i]r-:|k:Y1klT6'
  }
}
module.exports = config
