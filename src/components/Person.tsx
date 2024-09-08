import { Flex, Typography, Avatar } from 'antd'
import { format } from 'date-fns'

interface PersonProps {
  username: string
  image: string
  createdAt?: string | null
}

const Person = ({ username, image, createdAt = null }: PersonProps) => {
  return (
    <Flex gap="small" align="center" style={{ flexShrink: 0 }}>
      <Flex vertical align="end">
        <Typography.Text strong style={{ fontSize: 18 }}>
          {username}
        </Typography.Text>
        {createdAt && <Typography.Text type="secondary">{format(createdAt, 'MMM d, yyyy')}</Typography.Text>}
      </Flex>
      <Avatar
        size={40}
        src={image}
        icon={
          <>
            <img src="/cat.avif" alt="error" />
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 12,
                fontWeight: 'bold',
                fontFamily: 'ui-monospace',
                backgroundColor: 'rgba(10,10,10,0.6)',
                color: 'red',
              }}
            >
              error
            </span>
          </>
        }
        alt="avatar"
      />
    </Flex>
  )
}

export default Person
