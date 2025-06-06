#!/bin/bash

# ลบโฟลเดอร์ run-* ที่อายุเกิน 7 วัน จากชื่อโฟลเดอร์
for dir in run-*; do
  if [[ -d "$dir" ]]; then
    folder_date=$(echo "$dir" | grep -oP '\d{2}-\d{2}-\d{4}' | awk -F- '{print $3"-"$2"-"$1}')
    if [[ -n "$folder_date" ]]; then
      folder_timestamp=$(date -d "$folder_date" +%s)
      limit_timestamp=$(date -d "7 days ago" +%s)

      if (( folder_timestamp < limit_timestamp )); then
        echo "Removing old report: $dir"
        rm -rf "$dir"
      fi
    fi
  fi
done

# สร้าง index.html
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Allure Reports Archive</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      background-color: #f7f9fc;
      color: #333;
      margin: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 {
      color: #2e85ff;
      margin-bottom: 1rem;
      font-weight: 700;
      font-size: 1.8rem;
      white-space: nowrap;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 300px;
    }
    li {
      background: white;
      border-radius: 6px;
      box-shadow: 0 2px 5px rgb(0 0 0 / 0.1);
      margin-bottom: 0.5rem;
      transition: box-shadow 0.3s ease;
    }
    li:hover {
      box-shadow: 0 4px 12px rgb(46 133 255 / 0.4);
    }
    a {
      display: block;
      padding: 0.75rem 1rem;
      text-decoration: none;
      color: #2e85ff;
      font-weight: 600;
      font-size: 1.1rem;
      white-space: nowrap;
    }
    a:hover {
      background-color: #e6f0ff;
    }
  </style>
</head>
<body>
  <h1>Allure Reports Archive</h1>
  <ul>
EOF

# เพิ่มรายการโฟลเดอร์ run-* ที่เหลืออยู่ (เรียงจากใหม่ไปเก่า)
for d in $(ls -d run-* 2>/dev/null | sort -r); do
  echo "    <li><a href=\"${d}/index.html\">${d}</a></li>" >> index.html
done

# ปิด HTML
cat >> index.html << 'EOF'
  </ul>
</body>
</html>
EOF
