# lwc-redux Example

This is an exmaple of [chandrakiran-dev/lwc-redux](https://github.com/chandrakiran-dev/lwc-redux).
I have modified the ToDo App from the official tutorial to be able to display/add/update Salesforce Task object.

## How to setup

1. Create scratch org

```
sfdx force:org:create -f config/project-scratch-def.json -a lwc-redux-example -d 30 -s
```

2. Install lwc-redux package

```
sfdx force:package:install --package "lwc-redux@2.0.0-2" -w 15
```

3. Push source to scratch org

```
sfdx force:source:push
```

4. Assign Permission Set

```
sfdx force:user:permset:assign -n ToDoApp
```

5. Open scratch org

```
sfdx force:org:open --path /lightning/n/ToDoApp
```

![image](https://user-images.githubusercontent.com/877015/102715679-73721880-431a-11eb-8fd4-ea3d4d655427.png)
