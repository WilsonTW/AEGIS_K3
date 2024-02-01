# AEGIS

## 安裝步驟

```
npm install
```

開啟環境啟動

```
npm run serve
```

### 打包命令

```
npm run build
```

### 查詢地圖命令

地址：https://overpass-turbo.eu/

查詢公路等級代碼

```
(highway=primary or highway=secondary) and type:way
```

```
[out:json][timeout:25];
// gather results
(
  // query part for: “highway=primary”
  // way["highway"="primary"]({{bbox}});
  // query part for: “highway=secondary”
  // way["highway"="secondary"]({{bbox}});
  // query part for: “highway=trunk”
  way["highway"="trunk"]({{bbox}});
);
// print results
out body;
>;
out skel qt;
```

查詢建築代碼

```
[out:json][timeout:25];
// gather results
(
  // query part for: “building”
  way["building"]({{bbox}});
  relation["building"]({{bbox}});
);
// print results
out body;
>;
out skel qt;
```

查詢水

```
[out:json][timeout:25];
// gather results
(
  // query part for: “water”
  way["natural"="water"]({{bbox}});
  relation["natural"="water"]({{bbox}});
);
// print results
out body;
>;
out skel qt;
```

查詢河流

```
[out:json][timeout:25];
// gather results
(
  // query part for: “river”
  way["waterway"="river"]({{bbox}});
);
// print results
out body;
>;
out skel qt;
```

### Gui 的使用

改變顏色

```
          const parameters = {
            color: '#bfa'
          };
          app.gui
            .addColor(parameters, 'color')
            .name('顏色')
            .onChange(() => {
              waterMaterial.color.set(parameters.color);
            });
```

改變狀態

```
        app.gui.add(buildingMaterial, 'wireframe').name('顯示線框');
```

### MQTT Publish範例

```
{ "consumption" : "0", //'市電'
  "generation" : "124", //'總負載'
  "renewable" : "211" //'低碳能源'
}
```

