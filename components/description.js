import { Box } from 'theme-ui'
import React from 'react'
import { Link } from '@carbonplan/components'
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

const processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(rehype2react, {
    createElement: React.createElement,
    components: {
      p: (props) => <div {...props} />,
      a: Link,
    },
  })

const Description = ({ value, sx }) => {
  return <Box sx={sx}>{processor.processSync(value).result}</Box>
}

export default Description
