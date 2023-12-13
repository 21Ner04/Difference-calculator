### Hexlet tests and linter status:
[![Actions Status](https://github.com/21Ner04/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/21Ner04/frontend-project-46/actions)

# genDiff
___
Консольная утилита, которая принимает две структуры данных в качестве входных данных и выводит их различия в ходе предыдущих изменений.

### Информация о функциях утилиты:
___

##### Поддерживаемые расширения сверяемых файлов
- Json
- Yaml(yml)

##### Поддеживаемые форматы вывода результата

- Stylish
- Plain
- Json

### Инструкция установки
___

Склонируйте данный репозиторий `git clone` и выполните следующие команды:

```
make install
```

```
sudo npm link
```

### Информация об использовании:

____

Введите команду ниже в консоли и проверьте информацию

```
gendiff -h
```

```
Usage: genDiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format
  -h, --help           display help for command
```

### Примеры работы с утилитой
____

##### Сравнение плоских файлов (.JSON)
[![asciicast](.svg)]()

#### Сравнение плоских файлов (.Yaml, .yml)
[![asciicast](.svg)]()

#### Рекурсивное сравнение вложенных файлов формат stylish(.JSON)

[![asciicast](.svg)]()
#### Рекурсивное сравнение вложенных файлов формат plain(.JSON)

[![asciicast](.svg)]()
#### Рекурсивное сравнение вложенных файлов формат json(.JSON)

[![asciicast](.svg)]()