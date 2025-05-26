'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x3d04bc, _0x327833, _0x1d8f05, _0x37707d) {
  if (_0x37707d === undefined) {
    _0x37707d = _0x1d8f05;
  }
  var _0x404b66 = Object.getOwnPropertyDescriptor(_0x327833, _0x1d8f05);
  if (!_0x404b66 || ('get' in _0x404b66 ? !_0x327833.__esModule : _0x404b66.writable || _0x404b66.configurable)) {
    _0x404b66 = {
      'enumerable': true,
      'get': function () {
        return _0x327833[_0x1d8f05];
      }
    };
  }
  Object.defineProperty(_0x3d04bc, _0x37707d, _0x404b66);
} : function (_0x3ef0ad, _0x279d5c, _0x5dff28, _0x8d08cc) {
  if (_0x8d08cc === undefined) {
    _0x8d08cc = _0x5dff28;
  }
  _0x3ef0ad[_0x8d08cc] = _0x279d5c[_0x5dff28];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x9fd640, _0x46222f) {
  Object.defineProperty(_0x9fd640, "default", {
    'enumerable': true,
    'value': _0x46222f
  });
} : function (_0x49794d, _0x354958) {
  _0x49794d["default"] = _0x354958;
});
var __importStar = this && this.__importStar || function (_0x5e8937) {
  if (_0x5e8937 && _0x5e8937.__esModule) {
    return _0x5e8937;
  }
  var _0x3c3c9f = {};
  if (_0x5e8937 != null) {
    for (var _0x32e34f in _0x5e8937) if (_0x32e34f !== "default" && Object.prototype.hasOwnProperty.call(_0x5e8937, _0x32e34f)) {
      __createBinding(_0x3c3c9f, _0x5e8937, _0x32e34f);
    }
  }
  __setModuleDefault(_0x3c3c9f, _0x5e8937);
  return _0x3c3c9f;
};
var __importDefault = this && this.__importDefault || function (_0x390b92) {
  return _0x390b92 && _0x390b92.__esModule ? _0x390b92 : {
    'default': _0x390b92
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require('@whiskeysockets/baileys'));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1['default'].child({});
logger.level = "silent";
const pino = require('pino');
const boom_1 = require('@hapi/boom');
const conf = require("./set");
let fs = require('fs-extra');
let path = require("path");
const FileType = require('file-type');
const {
  Sticker,
  createSticker,
  StickerTypes
} = require('wa-sticker-formatter');
const {
  verifierEtatJid,
  recupererActionJid
} = require('./bdd/antilien');
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
let evt = require(__dirname + "/framework/zokou");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
let {
  reagir
} = require(__dirname + "/framework/app");
var session = conf.session.replace(/RAHMANI_MD;;;=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/auth/creds.json")) {
      console.log("connected successfully...");
      await fs.writeFileSync(__dirname + '/auth/creds.json', atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/auth/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + '/auth/creds.json', atob(session), "utf8");
    }
  } catch (_0x286356) {
    console.log("Session Invalid " + _0x286356);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  async function _0x3c3186() {
    0x0;
    const {
      version: _0x17ed39,
      isLatest: _0x388dce
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x46a214,
      saveCreds: _0x4535cf
    } = await baileys_1.useMultiFileAuthState(__dirname + "/auth");
    0x0;
    const _0x507b32 = {
      'version': _0x17ed39,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ["𝑹𝑨𝑯𝑴𝑨𝑵𝑰_𝑴𝑫", 'safari', '1.0.0'],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x46a214.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x46a214.keys, logger)
      },
      'getMessage': async _0x2c69d7 => {
        if (store) {
          const _0x4b8690 = await store.loadMessage(_0x2c69d7.remoteJid, _0x2c69d7.id, undefined);
          return _0x4b8690.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x3c0d05 = baileys_1["default"](_0x507b32);
    store.bind(_0x3c0d05.ev);
    setInterval(() => {
      store.writeToFile('store.json');
    }, 0xbb8);
    _0x3c0d05.ev.on("messages.upsert", async _0x28b28b => {
      const {
        messages: _0x2c96bc
      } = _0x28b28b;
      const _0x2f24da = _0x2c96bc[0x0];
      if (!_0x2f24da.message) {
        return;
      }
      const _0x13881e = _0x2e983e => {
        if (!_0x2e983e) {
          return _0x2e983e;
        }
        if (/:\d+@/gi.test(_0x2e983e)) {
          0x0;
          let _0x5e3077 = baileys_1.jidDecode(_0x2e983e) || {};
          return _0x5e3077.user && _0x5e3077.server && _0x5e3077.user + '@' + _0x5e3077.server || _0x2e983e;
        } else {
          return _0x2e983e;
        }
      };
      0x0;
      var _0x57072e = baileys_1.getContentType(_0x2f24da.message);
      var _0x23089b = _0x57072e == "conversation" ? _0x2f24da.message.conversation : _0x57072e == "imageMessage" ? _0x2f24da.message.imageMessage?.["caption"] : _0x57072e == "videoMessage" ? _0x2f24da.message.videoMessage?.["caption"] : _0x57072e == "extendedTextMessage" ? _0x2f24da.message?.["extendedTextMessage"]?.["text"] : _0x57072e == "buttonsResponseMessage" ? _0x2f24da?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0x57072e == "listResponseMessage" ? _0x2f24da.message?.['listResponseMessage']?.["singleSelectReply"]?.["selectedRowId"] : _0x57072e == "messageContextInfo" ? _0x2f24da?.["message"]?.["buttonsResponseMessage"]?.['selectedButtonId'] || _0x2f24da.message?.["listResponseMessage"]?.['singleSelectReply']?.["selectedRowId"] || _0x2f24da.text : '';
      var _0x6e994 = _0x2f24da.key.remoteJid;
      var _0x460da7 = _0x13881e(_0x3c0d05.user.id);
      var _0x57e83f = _0x460da7.split('@')[0x0];
      const _0x145509 = _0x6e994?.["endsWith"]('@g.us');
      var _0x2306a7 = _0x145509 ? await _0x3c0d05.groupMetadata(_0x6e994) : '';
      var _0x5eb183 = _0x145509 ? _0x2306a7.subject : '';
      var _0x1ba0a2 = _0x2f24da.message.extendedTextMessage?.["contextInfo"]?.['quotedMessage'];
      var _0x4c7ad2 = _0x13881e(_0x2f24da.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0x455cf5 = _0x145509 ? _0x2f24da.key.participant ? _0x2f24da.key.participant : _0x2f24da.participant : _0x6e994;
      if (_0x2f24da.key.fromMe) {
        _0x455cf5 = _0x460da7;
      }
      var _0x302f3b = _0x145509 ? _0x2f24da.key.participant : '';
      const {
        getAllSudoNumbers: _0x21d67f
      } = require("./bdd/sudo");
      const _0xdf0264 = _0x2f24da.pushName;
      const _0x12ccdc = await _0x21d67f();
      const _0x1c6408 = [_0x57e83f, '255693629079', "255693629079", '255693629079', "255693629079", conf.NUMERO_OWNER].map(_0x3808e9 => _0x3808e9.replace(/[^0-9]/g) + '@s.whatsapp.net');
      const _0x30d2a1 = _0x1c6408.concat(_0x12ccdc);
      const _0x2f0639 = _0x30d2a1.includes(_0x455cf5);
      var _0x49515b = ['255693629079', "255693629079", '255693629079', "255693629079"].map(_0xb41430 => _0xb41430.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x455cf5);
      function _0x25fef0(_0xdba64a) {
        _0x3c0d05.sendMessage(_0x6e994, {
          'text': _0xdba64a
        }, {
          'quoted': _0x2f24da
        });
      }
      console.log("\t [][]...{RAHMANI_MD}...[][]");
      console.log("=========== New message ===========");
      if (_0x145509) {
        console.log("message sent from : " + _0x5eb183);
      }
      console.log("message from : [" + _0xdf0264 + " : " + _0x455cf5.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("type of message : " + _0x57072e);
      console.log("------end of your messages ------");
      console.log(_0x23089b);
      function _0x833756(_0x21a958) {
        let _0x389f5a = [];
        for (_0x28b28b of _0x21a958) {
          if (_0x28b28b.admin == null) {
            continue;
          }
          _0x389f5a.push(_0x28b28b.id);
        }
        return _0x389f5a;
      }
      var _0x2b3d68 = conf.ETAT;
      if (_0x2b3d68 == 0x1) {
        await _0x3c0d05.sendPresenceUpdate("available", _0x6e994);
      } else {
        if (_0x2b3d68 == 0x2) {
          await _0x3c0d05.sendPresenceUpdate("composing", _0x6e994);
        } else if (_0x2b3d68 == 0x3) {
          await _0x3c0d05.sendPresenceUpdate("recording", _0x6e994);
        } else {
          await _0x3c0d05.sendPresenceUpdate("unavailable", _0x6e994);
        }
      }
      const _0x538fd3 = _0x145509 ? await _0x2306a7.participants : '';
      let _0x2bd4d5 = _0x145509 ? _0x833756(_0x538fd3) : '';
      const _0x4034fd = _0x145509 ? _0x2bd4d5.includes(_0x455cf5) : false;
      var _0xd5d8db = _0x145509 ? _0x2bd4d5.includes(_0x460da7) : false;
      const _0x2f17dd = _0x23089b ? _0x23089b.trim().split(/ +/).slice(0x1) : null;
      const _0x1e9cfe = _0x23089b ? _0x23089b.startsWith(prefixe) : false;
      const _0x2f9a50 = _0x1e9cfe ? _0x23089b.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x579671 = conf.URL.split(',');
      function _0x28e82c() {
        const _0x4f6c9c = Math.floor(Math.random() * _0x579671.length);
        const _0x3245eb = _0x579671[_0x4f6c9c];
        return _0x3245eb;
      }
      var _0x5b5507 = {
        'superUser': _0x2f0639,
        'dev': _0x49515b,
        'verifGroupe': _0x145509,
        'mbre': _0x538fd3,
        'membreGroupe': _0x302f3b,
        'verifAdmin': _0x4034fd,
        'infosGroupe': _0x2306a7,
        'nomGroupe': _0x5eb183,
        'auteurMessage': _0x455cf5,
        'nomAuteurMessage': _0xdf0264,
        'idBot': _0x460da7,
        'verifZokouAdmin': _0xd5d8db,
        'prefixe': prefixe,
        'arg': _0x2f17dd,
        'repondre': _0x25fef0,
        'mtype': _0x57072e,
        'groupeAdmin': _0x833756,
        'msgRepondu': _0x1ba0a2,
        'auteurMsgRepondu': _0x4c7ad2,
        'ms': _0x2f24da,
        'mybotpic': _0x28e82c
      };
      if (_0x2f24da.message.protocolMessage && _0x2f24da.message.protocolMessage.type === 0x0 && conf.ADM.toLocaleLowerCase() === "yes") {
        if (_0x2f24da.key.fromMe || _0x2f24da.message.protocolMessage.key.fromMe) {
          console.log("Message supprimer me concernant");
          return;
        }
        console.log("Message supprimer");
        let _0x42bab0 = _0x2f24da.message.protocolMessage.key;
        try {
          const _0x1855a2 = fs.readFileSync('./store.json', 'utf8');
          const _0x41e043 = JSON.parse(_0x1855a2);
          let _0x285db5 = _0x41e043.messages[_0x42bab0.remoteJid];
          let _0x3b7c9d;
          for (let _0x5ac734 = 0x0; _0x5ac734 < _0x285db5.length; _0x5ac734++) {
            if (_0x285db5[_0x5ac734].key.id === _0x42bab0.id) {
              _0x3b7c9d = _0x285db5[_0x5ac734];
              break;
            }
          }
          if (_0x3b7c9d === null || !_0x3b7c9d || _0x3b7c9d === "undefined") {
            console.log("Message non trouver");
            return;
          }
          await _0x3c0d05.sendMessage(_0x460da7, {
            'image': {
              'url': "./media/deleted-message.jpg"
            },
            'caption': "        RAHMANI_MD DELETED INFORMATION\n Message from @" + _0x3b7c9d.key.participant.split('@')[0x0] + '​',
            'mentions': [_0x3b7c9d.key.participant]
          }).then(() => {
            _0x3c0d05.sendMessage(_0x460da7, {
              'forward': _0x3b7c9d
            }, {
              'quoted': _0x3b7c9d
            });
          });
        } catch (_0x34287c) {
          console.log(_0x34287c);
        }
      }
      if (_0x2f24da.key && _0x2f24da.key.remoteJid === 'status@broadcast' && conf.AUTO_READ_STATUS === "yes") {
        await _0x3c0d05.readMessages([_0x2f24da.key]);
      }
      if (_0x2f24da.key && _0x2f24da.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        if (_0x2f24da.message.extendedTextMessage) {
          var _0x4125df = _0x2f24da.message.extendedTextMessage.text;
          await _0x3c0d05.sendMessage(_0x460da7, {
            'text': _0x4125df
          }, {
            'quoted': _0x2f24da
          });
        } else {
          if (_0x2f24da.message.imageMessage) {
            var _0x17b620 = _0x2f24da.message.imageMessage.caption;
            var _0x50eab8 = await _0x3c0d05.downloadAndSaveMediaMessage(_0x2f24da.message.imageMessage);
            await _0x3c0d05.sendMessage(_0x460da7, {
              'image': {
                'url': _0x50eab8
              },
              'caption': _0x17b620
            }, {
              'quoted': _0x2f24da
            });
          } else {
            if (_0x2f24da.message.videoMessage) {
              var _0x17b620 = _0x2f24da.message.videoMessage.caption;
              var _0x29f297 = await _0x3c0d05.downloadAndSaveMediaMessage(_0x2f24da.message.videoMessage);
              await _0x3c0d05.sendMessage(_0x460da7, {
                'video': {
                  'url': _0x29f297
                },
                'caption': _0x17b620
              }, {
                'quoted': _0x2f24da
              });
            }
          }
        }
      }
      if (!_0x49515b && _0x6e994 == '120363158701337904@g.us') {
        return;
      }
      if (_0x23089b && _0x455cf5.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x46434d
        } = require("./bdd/level");
        try {
          await _0x46434d(_0x455cf5);
        } catch (_0x1895d7) {
          console.error(_0x1895d7);
        }
      }
      try {
        if (_0x2f24da.message[_0x57072e].contextInfo.mentionedJid && (_0x2f24da.message[_0x57072e].contextInfo.mentionedJid.includes(_0x460da7) || _0x2f24da.message[_0x57072e].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0x6e994 == '120363158701337904@g.us') {
            return;
          }
          ;
          if (_0x2f0639) {
            console.log('hummm');
            return;
          }
          let _0x56f27f = require("./bdd/mention");
          let _0x4f6309 = await _0x56f27f.recupererToutesLesValeurs();
          let _0x493c6c = _0x4f6309[0x0];
          if (_0x493c6c.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x55dd64;
          if (_0x493c6c.type.toLocaleLowerCase() === "image") {
            _0x55dd64 = {
              'image': {
                'url': _0x493c6c.url
              },
              'caption': _0x493c6c.message
            };
          } else {
            if (_0x493c6c.type.toLocaleLowerCase() === "video") {
              _0x55dd64 = {
                'video': {
                  'url': _0x493c6c.url
                },
                'caption': _0x493c6c.message
              };
            } else {
              if (_0x493c6c.type.toLocaleLowerCase() === "sticker") {
                let _0xefddf7 = new Sticker(_0x493c6c.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x495ff8 = await _0xefddf7.toBuffer();
                _0x55dd64 = {
                  'sticker': _0x495ff8
                };
              } else if (_0x493c6c.type.toLocaleLowerCase() === "audio") {
                _0x55dd64 = {
                  'audio': {
                    'url': _0x493c6c.url
                  },
                  'mimetype': 'audio/mp4'
                };
              }
            }
          }
          _0x3c0d05.sendMessage(_0x6e994, _0x55dd64, {
            'quoted': _0x2f24da
          });
        }
      } catch (_0x300940) {}
      try {
        const _0x1648bd = await verifierEtatJid(_0x6e994);
        if (_0x23089b.includes("https://") && _0x145509 && _0x1648bd) {
          console.log("lien detecté");
          var _0x5015df = _0x145509 ? _0x2bd4d5.includes(_0x460da7) : false;
          if (_0x2f0639 || _0x4034fd || !_0x5015df) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x580cd7 = {
            'remoteJid': _0x6e994,
            'fromMe': false,
            'id': _0x2f24da.key.id,
            'participant': _0x455cf5
          };
          var _0x3b4d17 = "link detected!!\n";
          var _0x46c45c = new Sticker('https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif', {
            'pack': "joel-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x46c45c.toFile('st1.webp');
          var _0x54b686 = await recupererActionJid(_0x6e994);
          if (_0x54b686 === "remove") {
            _0x3b4d17 += "message deleted \n @" + _0x455cf5.split('@')[0x0] + " removed from group by Rahmani_Tech.";
            await _0x3c0d05.sendMessage(_0x6e994, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x3c0d05.sendMessage(_0x6e994, {
              'text': _0x3b4d17,
              'mentions': [_0x455cf5]
            }, {
              'quoted': _0x2f24da
            });
            try {
              await _0x3c0d05.groupParticipantsUpdate(_0x6e994, [_0x455cf5], "remove");
            } catch (_0x7255d8) {
              console.log("antiien ") + _0x7255d8;
            }
            await _0x3c0d05.sendMessage(_0x6e994, {
              'delete': _0x580cd7
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x54b686 === "delete") {
              _0x3b4d17 += "message deleted \n @" + _0x455cf5.split('@')[0x0] + " avoid sending link.";
              await _0x3c0d05.sendMessage(_0x6e994, {
                'text': _0x3b4d17,
                'mentions': [_0x455cf5]
              }, {
                'quoted': _0x2f24da
              });
              await _0x3c0d05.sendMessage(_0x6e994, {
                'delete': _0x580cd7
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x54b686 === 'warn') {
                const {
                  getWarnCountByJID: _0x3775f9,
                  ajouterUtilisateurAvecWarnCount: _0x20485e
                } = require("./bdd/warn");
                let _0x2b22fc = await _0x3775f9(_0x455cf5);
                let _0x4e0647 = conf.WARN_COUNT;
                if (_0x2b22fc >= _0x4e0647) {
                  var _0x3dd531 = "link detected , you will be removed because of reaching warn-limit";
                  await _0x3c0d05.sendMessage(_0x6e994, {
                    'text': _0x3dd531,
                    'mentions': [_0x455cf5]
                  }, {
                    'quoted': _0x2f24da
                  });
                  await _0x3c0d05.groupParticipantsUpdate(_0x6e994, [_0x455cf5], "remove");
                  await _0x3c0d05.sendMessage(_0x6e994, {
                    'delete': _0x580cd7
                  });
                } else {
                  var _0x135b76 = _0x4e0647 - _0x2b22fc;
                  var _0x355be8 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x135b76 + " ";
                  await _0x20485e(_0x455cf5);
                  await _0x3c0d05.sendMessage(_0x6e994, {
                    'text': _0x355be8,
                    'mentions': [_0x455cf5]
                  }, {
                    'quoted': _0x2f24da
                  });
                  await _0x3c0d05.sendMessage(_0x6e994, {
                    'delete': _0x580cd7
                  });
                }
              }
            }
          }
        }
      } catch (_0x1cedb1) {
        console.log("bdd err " + _0x1cedb1);
      }
      try {
        const _0x3e751f = _0x2f24da.key?.['id']?.["startsWith"]("BAES") && _0x2f24da.key?.['id']?.["length"] === 0x10;
        const _0xf9f3df = _0x2f24da.key?.['id']?.['startsWith']("BAE5") && _0x2f24da.key?.['id']?.["length"] === 0x10;
        if (_0x3e751f || _0xf9f3df) {
          if (_0x57072e === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x316bda = await atbverifierEtatJid(_0x6e994);
          if (!_0x316bda) {
            return;
          }
          ;
          if (_0x4034fd || _0x455cf5 === _0x460da7) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1e2015 = {
            'remoteJid': _0x6e994,
            'fromMe': false,
            'id': _0x2f24da.key.id,
            'participant': _0x455cf5
          };
          var _0x3b4d17 = "bot detected, \n";
          var _0x46c45c = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': "joel-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x46c45c.toFile("st1.webp");
          var _0x54b686 = await atbrecupererActionJid(_0x6e994);
          if (_0x54b686 === "remove") {
            _0x3b4d17 += "message deleted \n @" + _0x455cf5.split('@')[0x0] + " removed from group.";
            await _0x3c0d05.sendMessage(_0x6e994, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x3c0d05.sendMessage(_0x6e994, {
              'text': _0x3b4d17,
              'mentions': [_0x455cf5]
            }, {
              'quoted': _0x2f24da
            });
            try {
              await _0x3c0d05.groupParticipantsUpdate(_0x6e994, [_0x455cf5], "remove");
            } catch (_0x205bb9) {
              console.log("antibot ") + _0x205bb9;
            }
            await _0x3c0d05.sendMessage(_0x6e994, {
              'delete': _0x1e2015
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x54b686 === 'delete') {
              _0x3b4d17 += "message delete \n @" + _0x455cf5.split('@')[0x0] + " Avoid sending link.";
              await _0x3c0d05.sendMessage(_0x6e994, {
                'text': _0x3b4d17,
                'mentions': [_0x455cf5]
              }, {
                'quoted': _0x2f24da
              });
              await _0x3c0d05.sendMessage(_0x6e994, {
                'delete': _0x1e2015
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x54b686 === "warn") {
                const {
                  getWarnCountByJID: _0x5a7cc8,
                  ajouterUtilisateurAvecWarnCount: _0x51671b
                } = require("./bdd/warn");
                let _0x817c39 = await _0x5a7cc8(_0x455cf5);
                let _0x2eb4e3 = conf.WARN_COUNT;
                if (_0x817c39 >= _0x2eb4e3) {
                  var _0x3dd531 = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0x3c0d05.sendMessage(_0x6e994, {
                    'text': _0x3dd531,
                    'mentions': [_0x455cf5]
                  }, {
                    'quoted': _0x2f24da
                  });
                  await _0x3c0d05.groupParticipantsUpdate(_0x6e994, [_0x455cf5], "remove");
                  await _0x3c0d05.sendMessage(_0x6e994, {
                    'delete': _0x1e2015
                  });
                } else {
                  var _0x135b76 = _0x2eb4e3 - _0x817c39;
                  var _0x355be8 = "bot detected , your warn_count was upgraded ;\n rest : " + _0x135b76 + " ";
                  await _0x51671b(_0x455cf5);
                  await _0x3c0d05.sendMessage(_0x6e994, {
                    'text': _0x355be8,
                    'mentions': [_0x455cf5]
                  }, {
                    'quoted': _0x2f24da
                  });
                  await _0x3c0d05.sendMessage(_0x6e994, {
                    'delete': _0x1e2015
                  });
                }
              }
            }
          }
        }
      } catch (_0x398b2b) {
        console.log(".... " + _0x398b2b);
      }
      if (_0x1e9cfe) {
        const _0x1255b0 = evt.cm.find(_0xa55d02 => _0xa55d02.nomCom === _0x2f9a50);
        if (_0x1255b0) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x2f0639) {
              return;
            }
            if (!_0x2f0639 && _0x6e994 === _0x455cf5 && conf.PM_PERMIT === 'yes') {
              _0x25fef0("ERROR!! ❌\n\nYou don't have acces to commands here");
              return;
            }
            if (!_0x2f0639 && _0x145509) {
              let _0x5441ce = await isGroupBanned(_0x6e994);
              if (_0x5441ce) {
                return;
              }
            }
            if (!_0x4034fd && _0x145509) {
              let _0x3fa99c = await isGroupOnlyAdmin(_0x6e994);
              if (_0x3fa99c) {
                return;
              }
            }
            if (!_0x2f0639) {
              let _0x5a3ed0 = await isUserBanned(_0x455cf5);
              if (_0x5a3ed0) {
                _0x25fef0("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x6e994, _0x3c0d05, _0x2f24da, _0x1255b0.reaction);
            _0x1255b0.fonction(_0x6e994, _0x3c0d05, _0x5b5507);
          } catch (_0x2214ec) {
            console.log("😡😡 " + _0x2214ec);
            _0x3c0d05.sendMessage(_0x6e994, {
              'text': "😡😡 " + _0x2214ec
            }, {
              'quoted': _0x2f24da
            });
          }
        }
      }
    });
    const {
      recupevents: _0x3839d4
    } = require("./bdd/welcome");
    _0x3c0d05.ev.on("group-participants.update", async _0x5c4c2d => {
      console.log(_0x5c4c2d);
      let _0x3b0b13;
      try {
        _0x3b0b13 = await _0x3c0d05.profilePictureUrl(_0x5c4c2d.id, "image");
      } catch {
        _0x3b0b13 = "https://telegra.ph/file/f6c60977ceb194e05e616.jpg";
      }
      try {
        const _0x57ac8a = await _0x3c0d05.groupMetadata(_0x5c4c2d.id);
        if (_0x5c4c2d.action == 'add' && (await _0x3839d4(_0x5c4c2d.id, "welcome")) == 'on') {
          let _0x25c893 = "╔════■■■═════╗\n║ welcome to new member(s)\n║ *New(s) Member(s) :*\n";
          let _0x1d2ea6 = _0x5c4c2d.participants;
          for (let _0x8ce3f5 of _0x1d2ea6) {
            _0x25c893 += "║ @" + _0x8ce3f5.split('@')[0x0] + "\n";
          }
          _0x25c893 += "║\n╚════■■■═════╝\n◇ *Descriptioon*   ◇\n\n" + _0x57ac8a.desc + "\n\n> 𝑹𝑨𝑯𝑴𝑨𝑵𝑰 𝑴𝑫  BY Rahmani.";
          _0x3c0d05.sendMessage(_0x5c4c2d.id, {
            'image': {
              'url': _0x3b0b13
            },
            'caption': _0x25c893,
            'mentions': _0x1d2ea6
          });
        } else {
          if (_0x5c4c2d.action == "remove" && (await _0x3839d4(_0x5c4c2d.id, "goodbye")) == 'on') {
            let _0x2e0d30 = "20left group;\n";
            let _0x5d30c2 = _0x5c4c2d.participants;
            for (let _0x446fef of _0x5d30c2) {
              _0x2e0d30 += '@' + _0x446fef.split('@')[0x0] + "\n";
            }
            _0x3c0d05.sendMessage(_0x5c4c2d.id, {
              'text': _0x2e0d30,
              'mentions': _0x5d30c2
            });
          } else {
            if (_0x5c4c2d.action == "promote" && (await _0x3839d4(_0x5c4c2d.id, 'antipromote')) == 'on') {
              if (_0x5c4c2d.author == _0x57ac8a.owner || _0x5c4c2d.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x5c4c2d.author == decodeJid(_0x3c0d05.user.id) || _0x5c4c2d.author == _0x5c4c2d.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x3c0d05.groupParticipantsUpdate(_0x5c4c2d.id, [_0x5c4c2d.author, _0x5c4c2d.participants[0x0]], 'demote');
              _0x3c0d05.sendMessage(_0x5c4c2d.id, {
                'text': '@' + _0x5c4c2d.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x5c4c2d.author.split('@')[0x0] + " and @" + _0x5c4c2d.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x5c4c2d.author, _0x5c4c2d.participants[0x0]]
              });
            } else {
              if (_0x5c4c2d.action == "demote" && (await _0x3839d4(_0x5c4c2d.id, "antidemote")) == 'on') {
                if (_0x5c4c2d.author == _0x57ac8a.owner || _0x5c4c2d.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || _0x5c4c2d.author == decodeJid(_0x3c0d05.user.id) || _0x5c4c2d.author == _0x5c4c2d.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x3c0d05.groupParticipantsUpdate(_0x5c4c2d.id, [_0x5c4c2d.author], "demote");
                await _0x3c0d05.groupParticipantsUpdate(_0x5c4c2d.id, [_0x5c4c2d.participants[0x0]], "promote");
                _0x3c0d05.sendMessage(_0x5c4c2d.id, {
                  'text': '@' + _0x5c4c2d.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x5c4c2d.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x5c4c2d.author, _0x5c4c2d.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x1b4fcb) {
        console.error(_0x1b4fcb);
      }
    });
    async function _0x5d2974() {
      const _0x204b5d = require('node-cron');
      const {
        getCron: _0x1649a6
      } = require("./bdd/cron");
      let _0x2eb2df = await _0x1649a6();
      console.log(_0x2eb2df);
      if (_0x2eb2df.length > 0x0) {
        for (let _0x37c420 = 0x0; _0x37c420 < _0x2eb2df.length; _0x37c420++) {
          if (_0x2eb2df[_0x37c420].mute_at != null) {
            let _0x556a5b = _0x2eb2df[_0x37c420].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x2eb2df[_0x37c420].group_id + " a " + _0x556a5b[0x0] + " H " + _0x556a5b[0x1]);
            _0x204b5d.schedule(_0x556a5b[0x1] + " " + _0x556a5b[0x0] + " * * *", async () => {
              await _0x3c0d05.groupSettingUpdate(_0x2eb2df[_0x37c420].group_id, 'announcement');
              _0x3c0d05.sendMessage(_0x2eb2df[_0x37c420].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
            }, {
              'timezone': 'Africa/Nairobi'
            });
          }
          if (_0x2eb2df[_0x37c420].unmute_at != null) {
            let _0x1085d9 = _0x2eb2df[_0x37c420].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x1085d9[0x0] + " H " + _0x1085d9[0x1] + " ");
            _0x204b5d.schedule(_0x1085d9[0x1] + " " + _0x1085d9[0x0] + " * * *", async () => {
              await _0x3c0d05.groupSettingUpdate(_0x2eb2df[_0x37c420].group_id, "not_announcement");
              _0x3c0d05.sendMessage(_0x2eb2df[_0x37c420].group_id, {
                'image': {
                  'url': './media/chrono.webp'
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': 'Africa/Nairobi'
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0x3c0d05.ev.on('contacts.upsert', async _0x1bf41f => {
      const _0x4c9385 = _0x54cd2a => {
        for (const _0x16e64a of _0x54cd2a) {
          if (store.contacts[_0x16e64a.id]) {
            Object.assign(store.contacts[_0x16e64a.id], _0x16e64a);
          } else {
            store.contacts[_0x16e64a.id] = _0x16e64a;
          }
        }
        return;
      };
      _0x4c9385(_0x1bf41f);
    });
    _0x3c0d05.ev.on("connection.update", async _0x49c590 => {
      const {
        lastDisconnect: _0x550033,
        connection: _0x41990f
      } = _0x49c590;
      if (_0x41990f === "connecting") {
        console.log("ℹ️ 𝑹𝑨𝑯𝑴𝑨𝑵𝑰 𝑴𝑫 connecting in your account...");
      } else {
        if (_0x41990f === "open") {
          console.log("✅ 𝑹𝑨𝑯𝑴𝑨𝑵𝑰 𝑴𝑫 connected successfully☺️");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log('------');
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("𝑹𝑨𝑯𝑴𝑨𝑵𝑰 𝑴𝑫 by Rahmani it installing cmds😇\n\n");
          console.log("chargement des commandes ...\n");
          fs.readdirSync(__dirname + "/commandes").forEach(_0x9466d0 => {
            if (path.extname(_0x9466d0).toLowerCase() == ".js") {
              try {
                require(__dirname + "/commandes/" + _0x9466d0);
                console.log(_0x9466d0 + "Successfully installed 𝑹𝑨𝑯𝑴𝑨𝑵𝑰 𝑴𝑫 commands✔️");
              } catch (_0x45af7e) {
                console.log(_0x9466d0 + " n'a pas pu être chargé pour les raisons suivantes : " + _0x45af7e);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x5f8409;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x5f8409 = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x5f8409 = "private";
          } else {
            _0x5f8409 = "undefined";
          }
          console.log("rahmani md successfully connected✅");
          await _0x5d2974();
          if (conf.DP.toLowerCase() === "yes") {
            let _0x4a1d79 = "𝑹𝑨𝑯𝑴𝑨𝑵𝑰 𝑴𝑫 IS ONLINE  ⏳\n" + readmore + "\n    \n    𝗣𝗿𝗲𝗳𝗶𝘅 : [ " + prefixe + " ]\n    𝗠𝗼𝗱𝗲 :" + _0x5f8409 + " mode\n    𝗣𝗹𝘂𝗴𝗶𝗻𝘀 : 245\n    𝗥𝗮𝗺 : 𝟲𝟴/𝟭𝟯𝟮 𝗚𝗕\n    𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : 𝗖𝗵𝗿𝗼𝗺𝗲 𝗟𝗶𝗻𝘂𝘅\n    𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : Rahmani  \n\n> 𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐟𝐨𝐫 𝐃𝐞𝐩𝐥𝐨𝐲𝐢𝐧𝐠 𝑹𝑨𝑯𝑴𝑨𝑵𝑰 𝑴𝑫";
            await _0x3c0d05.sendMessage(_0x3c0d05.user.id, {
              'text': _0x4a1d79
            });
          }
        } else {
          if (_0x41990f == 'close') {
            let _0x53699f = new boom_1.Boom(_0x550033?.["error"])?.["output"]["statusCode"];
            if (_0x53699f === baileys_1.DisconnectReason.badSession) {
              console.log("Wrong session Id format, rescan again...");
            } else {
              if (_0x53699f === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermée, reconnexion en cours ...");
                _0x3c3186();
              } else {
                if (_0x53699f === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error😞 ,,joel trying to reconnect... ");
                  _0x3c3186();
                } else {
                  if (_0x53699f === baileys_1.DisconnectReason?.['connectionReplaced']) {
                    console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x53699f === baileys_1.DisconnectReason.loggedOut) {
                      console.log("session disconnected,,, replace a new session id");
                    } else {
                      if (_0x53699f === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redémarrage en cours ▶️");
                        _0x3c3186();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x53699f);
                        const {
                          exec: _0x123a1a
                        } = require("child_process");
                        _0x123a1a("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x41990f);
            _0x3c3186();
          }
        }
      }
    });
    _0x3c0d05.ev.on('creds.update', _0x4535cf);
    _0x3c0d05.downloadAndSaveMediaMessage = async (_0x35fc0d, _0x4dd8d8 = '', _0x8658e1 = true) => {
      let _0x3b2394 = _0x35fc0d.msg ? _0x35fc0d.msg : _0x35fc0d;
      let _0x5c0518 = (_0x35fc0d.msg || _0x35fc0d).mimetype || '';
      let _0x13b753 = _0x35fc0d.mtype ? _0x35fc0d.mtype.replace(/Message/gi, '') : _0x5c0518.split('/')[0x0];
      0x0;
      const _0x1aed32 = await baileys_1.downloadContentFromMessage(_0x3b2394, _0x13b753);
      let _0x5c9a3e = Buffer.from([]);
      for await (const _0x32ddb9 of _0x1aed32) {
        _0x5c9a3e = Buffer.concat([_0x5c9a3e, _0x32ddb9]);
      }
      let _0x355731 = await FileType.fromBuffer(_0x5c9a3e);
      let _0x4db91b = './' + _0x4dd8d8 + '.' + _0x355731.ext;
      await fs.writeFileSync(_0x4db91b, _0x5c9a3e);
      return _0x4db91b;
    };
    _0x3c0d05.awaitForMessage = async (_0x2921df = {}) => {
      return new Promise((_0x4e676c, _0x23a8d7) => {
        if (typeof _0x2921df !== "object") {
          _0x23a8d7(new Error("Options must be an object"));
        }
        if (typeof _0x2921df.sender !== "string") {
          _0x23a8d7(new Error("Sender must be a string"));
        }
        if (typeof _0x2921df.chatJid !== "string") {
          _0x23a8d7(new Error("ChatJid must be a string"));
        }
        if (_0x2921df.timeout && typeof _0x2921df.timeout !== "number") {
          _0x23a8d7(new Error("Timeout must be a number"));
        }
        if (_0x2921df.filter && typeof _0x2921df.filter !== "function") {
          _0x23a8d7(new Error("Filter must be a function"));
        }
        const _0x1eb607 = _0x2921df?.["timeout"] || undefined;
        const _0x30f278 = _0x2921df?.["filter"] || (() => true);
        let _0x230b20 = undefined;
        let _0x108ab8 = _0x28ab46 => {
          let {
            type: _0x5b9821,
            messages: _0x587526
          } = _0x28ab46;
          if (_0x5b9821 == "notify") {
            for (let _0x31e4f9 of _0x587526) {
              const _0x312f63 = _0x31e4f9.key.fromMe;
              const _0x263739 = _0x31e4f9.key.remoteJid;
              const _0x1eb61f = _0x263739.endsWith('@g.us');
              const _0x4cb458 = _0x263739 == 'status@broadcast';
              const _0xc30b11 = _0x312f63 ? _0x3c0d05.user.id.replace(/:.*@/g, '@') : _0x1eb61f || _0x4cb458 ? _0x31e4f9.key.participant.replace(/:.*@/g, '@') : _0x263739;
              if (_0xc30b11 == _0x2921df.sender && _0x263739 == _0x2921df.chatJid && _0x30f278(_0x31e4f9)) {
                _0x3c0d05.ev.off("messages.upsert", _0x108ab8);
                clearTimeout(_0x230b20);
                _0x4e676c(_0x31e4f9);
              }
            }
          }
        };
        _0x3c0d05.ev.on("messages.upsert", _0x108ab8);
        if (_0x1eb607) {
          _0x230b20 = setTimeout(() => {
            _0x3c0d05.ev.off('messages.upsert', _0x108ab8);
            _0x23a8d7(new Error("Timeout"));
          }, _0x1eb607);
        }
      });
    };
    return _0x3c0d05;
  }
  let _0x4960f4 = require.resolve(__filename);
  fs.watchFile(_0x4960f4, () => {
    fs.unwatchFile(_0x4960f4);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x4960f4];
    require(_0x4960f4);
  });
  _0x3c3186();
}, 0x1388);