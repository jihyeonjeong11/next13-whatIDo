# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - navigation "Breadcrumb" [ref=e4]:
        - link "Home" [ref=e5] [cursor=pointer]:
          - /url: /
          - img [ref=e6]
          - generic [ref=e9]: Home
        - img [ref=e10]
        - link "Multi-step Form" [ref=e12] [cursor=pointer]:
          - /url: /docs/react
      - button "Toggle theme" [ref=e13] [cursor=pointer]:
        - img [ref=e14]
  - generic [ref=e23]:
    - heading "Signup form" [level=2] [ref=e25]
    - generic [ref=e26]:
      - generic [ref=e28]:
        - generic [ref=e29]:
          - button [ref=e30] [cursor=pointer]:
            - img [ref=e33]
          - button [ref=e37]:
            - img [ref=e40]
          - button [ref=e44]:
            - img [ref=e47]
        - generic [ref=e50]:
          - button "Previous" [disabled]
          - button "Next" [ref=e51]
      - group "기본 회원정보" [ref=e54]:
        - generic [ref=e55]: 기본 회원정보
        - paragraph [ref=e56]: "단계1: 기본정보를 입력하세요"
        - generic [ref=e57]: 회원명
        - textbox "anything1356" [ref=e58]
  - button "Open Next.js Dev Tools" [ref=e64] [cursor=pointer]:
    - img [ref=e65]
  - alert [ref=e68]
```