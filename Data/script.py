import requests
import os
import xml.etree.ElementTree as ET
import re
import json

def trata_figuras_antigas(corpo):
    res = []
    figuras = corpo.findall('figura')
    for figura in figuras:
        fig = {}
        fig['path'] = re.sub(r'\.\.','/Data',figura.find('imagem').attrib['path']) 
        fig['legenda'] = figura.find('legenda').text
        res.append(fig)
    return res

def trata_figuras_atuais(num,path='atual'):
    res = []
    p = str(num) + '-'
    for filename in os.listdir(path):
        if re.match(p,filename):
            fig = {}
            fig['legenda'] = ''
            fig['path'] = '/Data/' + path + '/' + filename
            res.append(fig)
    return res

def trata_text(text):
    text = re.sub('^\s*','',text)
    text = re.sub('\s*$','',text)
    text = re.sub('\n','',text)
    text = re.sub(r' {2,}',' ',text)
    return text


def trata_lugares(para):
    lugares = []
    for lugar in para.findall('lugar'):
        text = trata_text(lugar.text)
        if text not in lugares:
            lugares.append(text)
    return lugares

def trata_dates(para):
    dates = []
    for date in para.findall('data'):
        text = trata_text(date.text)
        if text not in dates:
            dates.append(text)
    return dates

def trata_entidades(para,entidades,eid):
    for entidade in para.findall('entidade'):
        text = trata_text(entidade.text)
        if text not in eid:
            e = {}
            e['nome'] = text
            tipo = ''
            if 'tipo' in entidade.keys():
                tipo = entidade.attrib['tipo']
            elif 'entidade' in entidade.keys():
                tipo = entidade.attrib['entidade']
            e['tipo'] = tipo
            entidades.append(e)
            eid.append(e['nome'])

def trata_replace(l1,par,string):
    i = 0
    for l in l1:
        j = 0
        for para in par:
            par[j] = para.replace(l,string + str(i))
            j+=1
        i+=1

def trata_replace2(entidades,par):
    i = 0
    for e in entidades:
        j = 0
        for para in par:
            par[j] = para.replace(e['nome'],'#E'+ str(i))
            j+=1
        i+=1
    
def get_para_text(para):
    para_text = []
    for elem in para.iter():
        if elem.text and elem.tail:
            para_text.append(elem.text + elem.tail)
        elif elem.text:
            para_text.append(elem.text)
        elif elem.tail:
            para_text.append(elem.tail)
    return para_text

def formata_dates(dates):
    dates = list(map(lambda str: re.sub(r'[\n\s]+',' ', str),dates))
    dates = list(map(lambda str: re.sub(r'sec','séc', str),dates))
    dates = list(map(lambda str: re.sub(r'(\d\d).(\d\d).(\d\d\d\d)',r'\1-\2-\3', str),dates))
    return dates

def format_paragrafos(lugares,dates,entidades,par):
    trata_replace(lugares,par,'#L')
    trata_replace(dates,par,'#D')
    trata_replace2(entidades,par)
    lugares = list(map(lambda str: re.sub(r'[\n\s]+',' ', str),lugares))
    lugares = list(map(lambda str: re.sub(r'\b(?!e\b|dos?\b|das?\b|de\b)\w', lambda x: x.group().upper(), str),lugares))
    # lugares = list(set(lugares))
    dates = formata_dates(dates)

def trata_paragrafos(corpo,flag):
    par = []
    dates = []
    lugares = []
    entidades = []
    eid = []
    # re.findall(r'<para>.+<\/para>',corpo.text,flags=re.S):
    for para in corpo.findall('para'):  
        para_text = get_para_text(para)
        para_text = ' '.join(filter(None,para_text))
        para_text = re.sub(r'[\n\s]+',' ', para_text)
        if para_text:
            par.append(para_text)
            trata_entidades(para, entidades,eid)
            append_not_repetidos(trata_lugares(para),lugares)
            append_not_repetidos(trata_dates(para),dates)
    if flag:
        format_paragrafos(lugares,dates,entidades,par)
    return (par,dates,lugares,entidades)

def append_not_repetidos(src,append):
    for l in src:
        if not l in append:
            append.append(l)

def append_not_repetidos2(src,eid,append):
    for l in src:
        if not l['nome'] in eid:
            append.append(l)

def get_text(corpo,tag):
    elem = corpo.find(tag)
    if elem is not None:
        elem = elem.text
    else:
        elem = ''
    return elem

def trata_lista_casas(corpo,dates,lugares,entidades):
    casas = []
    lc = corpo.find('lista-casas')
    if lc:
        listacasas = lc.findall('casa')
        for casa in listacasas:
            num = casa.find('número').text
            enfiteuta = get_text(casa,'enfiteuta')
            foro = get_text(casa,'foro')
            descaux = casa.find('desc')
            if descaux:
                (paragrafos,datas,ls,entis) = trata_paragrafos(descaux,False)
                desc = paragrafos
                eid = set(map(lambda e: e['nome'],entidades))
                append_not_repetidos(datas,dates)
                append_not_repetidos(ls,lugares)
                append_not_repetidos2(entis,eid,entidades)
                format_paragrafos(lugares,dates,entidades,desc)
            else:
                desc = []
            c = {
                'num':num,
                'enfiteuta': enfiteuta,
                'foro' : foro,
                'desc': desc
            }
            casas.append(c)
    return casas

directory = 'texto'
 
listaruas = []

for filename in os.listdir(directory):
    f = os.path.join(directory, filename)
    tree = ET.parse(f)
    root = tree.getroot()
    rua = {}
    figura_antiga = []
    figura_atual = []
    meta = root.find('meta')
    nome = meta.find('nome')
    numero = meta.find('número').text
    rua['_id'] = nome.text.replace(' ','_')
    corpo = root.find('corpo')
    rua['figuras_antigas'] = trata_figuras_antigas(corpo)
    rua['figuras_atuais']  = trata_figuras_atuais(numero)
    (paragrafos,dates,lugares,enti) = trata_paragrafos(corpo,True)
    rua['paragrafos'] = paragrafos
    rua['datas'] = dates
    rua['lugares'] = lugares
    rua['entidades'] = enti
    rua['casas'] = trata_lista_casas(corpo,dates,lugares,enti)
    listaruas.append(rua)

f = 'all_data.json'
with open(f,mode='w') as file:
    json.dump(listaruas,file,indent=4,ensure_ascii=False)