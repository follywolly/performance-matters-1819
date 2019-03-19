```bash
"find . -name "*.js" -exec bash -c 'mv "$1" "${1%.js}".mjs' - '{}' \;"
```
