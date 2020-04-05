export default path => {
  return {
    content: `---
layout: SpecialLayout
---
# ${path}
`,
    status: 200
  }
}
