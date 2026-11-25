import os, json
src = os.path.dirname(os.path.abspath(__file__)) + '/src'
order = ['config.js','cloud.js','packs.js','data.js','cours_proba.js','simple_proba.js','qcm_proba.js','notes_proba.js','cours_angular.js','simple_angular.js','qcm_angular.js','cours_comm.js','simple_comm.js','qcm_comm.js','finalize.js','app.js']
js = '\n'.join(open(os.path.join(src,f)).read() for f in order)
css = open(os.path.join(src,'app.css')).read()
tpl = open(os.path.join(src,'template.html')).read()
body = tpl.replace('/*CSS*/', css).replace('/*JS*/', js.replace('</script','<\\/script'))
out = os.path.dirname(os.path.abspath(__file__)) + '/dist'; os.makedirs(out, exist_ok=True)
open(os.path.join(out,'artifact.html'),'w').write(body)
head = '''<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#ffffff">
<meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Révisions">
<link rel="manifest" href="manifest.webmanifest"><link rel="apple-touch-icon" href="icon-180.png"><link rel="icon" href="icon-192.png">
<style>:root{padding-top:env(safe-area-inset-top);padding-bottom:0}</style>
</head><body>'''
pwa = os.path.join(out,'pwa'); os.makedirs(pwa, exist_ok=True)
import shutil
os.makedirs(os.path.join(pwa,'vendor'), exist_ok=True)
for vf in os.listdir(os.path.join(src,'vendor')): shutil.copy(os.path.join(src,'vendor',vf), os.path.join(pwa,'vendor',vf))
pbody = body.replace('<meta name="claude:viewport-fit-sides" content="cover">','').replace('<script>', '<script src="vendor/supabase.js"></script>\n<script>', 1)
open(os.path.join(pwa,'index.html'),'w').write(head + pbody + '</body></html>')
print(len(body))
