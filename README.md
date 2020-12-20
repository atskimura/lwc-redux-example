# lwc-redux Example

## How to setup

1. Create scratch org

```
sfdx force:org:create -f config/project-scratch-def.json -a lwcreduxexample -d 30 -s
```

2. Install lwc-redux package

```
sfdx force:package:install --package "lwc-redux@2.0.0-2" -w 15
```