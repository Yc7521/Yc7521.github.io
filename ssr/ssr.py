#!/usr/bin/python
# -*- coding: UTF-8 -*-

import base64
import demjson as json
import pyperclip as pc

'''
A method of decoding ss url and ssr url.
'''


def fill(b64):
    return b64 + "=" * (0 if len(b64) % 4 == 0 else 4 - len(b64) % 4)


def clear_ssr(deb64):
    pos = deb64.rfind('/')
    return deb64[:pos] if pos > 0 else deb64


def clear_ss(deb64):
    pos = deb64.rfind('#')
    return deb64[:pos] if pos > 0 else deb64


def decode(txt: str) -> str:
    return bytes.decode(base64.urlsafe_b64decode(fill(txt)))


def encode(txt: str) -> str:
    return base64.urlsafe_b64encode(txt.encode()).decode().rstrip('=')


def ssr_parse(txt):
    # ssr://server:port:protocol:method:obfs:password_base64/?params_base64
    conf = decode(txt).split(':')
    if len(conf) != 6:
        print('不能解析SSR链接: %s' % txt)
        return
    conf_dict = dict()
    conf_dict["ip"] = conf[0]
    conf_dict["port"] = conf[1]
    conf_dict["protocol"] = conf[2]
    conf_dict["method"] = conf[3]
    conf_dict["obfs"] = conf[4]
    password_and_params = conf[5].split("/?")
    conf_dict["password"] = decode(password_and_params[0])
    if len(password_and_params) > 1:
        for part in password_and_params[1].split('&'):
            key_and_value = part.split('=')
            conf_dict[key_and_value[0]] = decode(key_and_value[1])
    return conf_dict


def to_ssr(dict: dict):
    txt = dict["ip"] + ':' + str(dict["port"]) + ':' + dict["protocol"] + \
        ':' + dict["method"] + ':' + dict["obfs"] + \
        ':' + encode(str(dict["password"]))
    obfsparam = dict.get('obfsparam')
    protoparam = dict.get('protoparam')
    remarks = dict.get('remarks')
    group = dict.get('group')
    obfsparam = "obfsparam=" + \
        encode(obfsparam) if obfsparam is not None else None
    protoparam = "protoparam=" + \
        encode(protoparam) if protoparam is not None else None
    remarks = "remarks="+encode(remarks) if remarks is not None else None
    group = "group="+encode(group) if group is not None else None
    params = []
    if obfsparam is not None:
        params.append(obfsparam)
    if protoparam is not None:
        params.append(protoparam)
    if remarks is not None:
        params.append(remarks)
    if group is not None:
        params.append(group)
    if len(params) > 0:
        txt += '/?'
    txt += '&'.join(params)
    return 'ssr://' + encode(txt)


def ss_parse(txt):
    # method:password@server:port
    conf = clear_ss(decode(txt))
    conf_list = []
    for part in conf.split('@'):
        conf_list += part.split(':')
    conf_dict = dict()
    conf_dict["method"] = conf_list[0]
    conf_dict["password"] = conf_list[1]
    conf_dict["ip"] = conf_list[2]
    conf_dict["port"] = conf_list[3]
    conf_dict["protocol"] = "origin"
    conf_dict["obfs"] = "plain"
    return conf_dict


def parse(txt):
    if 'ssr://' in txt:
        return ssr_parse(txt.replace('ssr://', ''))
    if 'ss://' in txt:
        return ss_parse(txt.replace('ss://', ''))
    raise Exception('ss url or ssr url format error.', txt)


def read4raw():
    urls = []
    with open('ssr/ssr.raw.txt', encoding='utf-8') as f:
        for i in f:
            t = i.strip()
            if len(t) == 0:
                continue
            a = parse(t)
            if 'group' in a:
                del a['group']
                del a['remarks']
            if 'obfsparam' not in a:
                a['obfsparam'] = ""
            urls.append(a)
    urls.sort(key=lambda a: a['ip'])
    return urls


def read4json():
    urls = []
    with open('ssr/ssr.json', encoding='utf-8') as f:
        urls = json.decode("\n".join(f.readlines()))
    urls.sort(key=lambda a: a['ip'])
    return urls


def save2json(urls):
    with open('ssr/ssr.json', 'w', encoding='utf-8') as f:
        f.write(json.encode(urls))


def save2raw(urls):
    with open('ssr/ssr.out.txt', 'w', encoding='utf-8') as f:
        f.writelines([to_ssr(i)+"\n" for i in urls])


def save2sub(urls):
    urls = [to_ssr(i) for i in urls]
    code = encode("\n".join(urls))
    with open('ssr/ssr.txt', 'w', encoding='utf-8') as f:
        f.write(code)
        f.write("\n")


def distinct(urls):
    m = dict()
    for i in urls:
        m[i['ip'] + i["port"]] = i
    return m.values()


if __name__ == '__main__':
    # urls = read4json()
    urls = read4raw()
    urls = distinct(urls)

    # save2json(urls)
    # save2raw(urls)
    for i in urls:
        i['group'] = "xxx"

    save2sub(urls)
