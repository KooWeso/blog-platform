import type { ReactNode } from 'react'
import type { FlexProps } from 'antd'
import { Flex } from 'antd'

import st from './contentWrapper.module.scss'

interface ContentWrapperProps extends FlexProps {
  children: ReactNode | ReactNode[]
}

const ContentWrapper = ({ children, className, ...props }: ContentWrapperProps) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Flex {...props} className={`${st.content__wrapper} ${className}`}>
      {children}
    </Flex>
  )
}

export default ContentWrapper
