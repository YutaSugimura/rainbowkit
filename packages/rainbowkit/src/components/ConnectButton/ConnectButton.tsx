import React from 'react';
import { mapResponsiveValue, ResponsiveValue } from '../../css/sprinkles.css';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { DropdownIcon } from '../Icons/Dropdown';
import { ConnectButtonRenderer } from './ConnectButtonRenderer';

type AccountStatus = 'full' | 'avatar' | 'address';
type ChainStatus = 'full' | 'icon' | 'name' | 'none';

export interface ConnectButtonProps {
  accountStatus?: ResponsiveValue<AccountStatus>;
  showBalance?: ResponsiveValue<boolean>;
  chainStatus?: ResponsiveValue<ChainStatus>;
}

const defaultProps = {
  accountStatus: 'full',
  chainStatus: { largeScreen: 'full', smallScreen: 'icon' },
  showBalance: { largeScreen: true, smallScreen: false },
} as const;

export function ConnectButton({
  accountStatus = defaultProps.accountStatus,
  chainStatus = defaultProps.chainStatus,
  showBalance = defaultProps.showBalance,
}: ConnectButtonProps) {
  return (
    <ConnectButtonRenderer>
      {({
        account,
        chain,
        connectModalOpen,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        return account ? (
          <Box display="flex" gap="12">
            {chain && (
              <Box
                alignItems="center"
                as="button"
                background={
                  chain.unsupported
                    ? 'connectButtonBackgroundError'
                    : 'connectButtonBackground'
                }
                borderRadius="connectButton"
                boxShadow="connectButton"
                color={
                  chain.unsupported
                    ? 'connectButtonTextError'
                    : 'connectButtonText'
                }
                display={mapResponsiveValue(chainStatus, value =>
                  value === 'none' ? 'none' : 'flex'
                )}
                fontFamily="body"
                fontWeight="bold"
                gap="6"
                onClick={openChainModal}
                paddingX="10"
                paddingY="8"
                transform={{ active: 'shrink', hover: 'grow' }}
                transition="default"
                type="button"
              >
                {chain.unsupported ? (
                  <Box>Invalid network</Box>
                ) : (
                  <Box alignItems="center" display="flex" gap="4">
                    {chain.iconUrl ? (
                      <Box
                        alt={chain.name ?? 'Chain icon'}
                        as="img"
                        display={mapResponsiveValue(chainStatus, value =>
                          value === 'full' || value === 'icon'
                            ? 'block'
                            : 'none'
                        )}
                        height="24"
                        src={chain.iconUrl}
                        width="24"
                      />
                    ) : null}
                    <Box
                      display={mapResponsiveValue(chainStatus, value => {
                        if (value === 'icon' && !chain.iconUrl) {
                          return 'block'; // Show the chain name if there is no iconUrl
                        }

                        return value === 'full' || value === 'name'
                          ? 'block'
                          : 'none';
                      })}
                    >
                      {chain.name ?? chain.id}
                    </Box>
                  </Box>
                )}
                <DropdownIcon />
              </Box>
            )}

            <Box
              alignItems="center"
              as="button"
              background="connectButtonBackground"
              borderRadius="connectButton"
              boxShadow="connectButton"
              color="connectButtonText"
              display="flex"
              fontFamily="body"
              fontWeight="bold"
              onClick={openAccountModal}
              transform={{ active: 'shrink', hover: 'grow' }}
              transition="default"
              type="button"
            >
              {account.displayBalance && (
                <Box
                  display={mapResponsiveValue(showBalance, value =>
                    value ? 'block' : 'none'
                  )}
                  padding="8"
                  paddingLeft="12"
                >
                  {account.displayBalance}
                </Box>
              )}
              <Box
                background="connectButtonInnerBackground"
                borderColor="connectButtonBackground"
                borderRadius="connectButton"
                borderStyle="solid"
                borderWidth="2"
                color="connectButtonText"
                fontFamily="body"
                fontWeight="bold"
                paddingX="8"
                paddingY="6"
                transition="default"
              >
                <Box alignItems="center" display="flex" gap="6" height="24">
                  <Box
                    display={mapResponsiveValue(accountStatus, value =>
                      value === 'full' || value === 'avatar' ? 'block' : 'none'
                    )}
                  >
                    <Avatar
                      address={account.address}
                      imageUrl={account.ensAvatar}
                      size={24}
                    />
                  </Box>

                  <Box alignItems="center" display="flex" gap="6">
                    <Box
                      display={mapResponsiveValue(accountStatus, value =>
                        value === 'full' || value === 'address'
                          ? 'block'
                          : 'none'
                      )}
                    >
                      {account.displayName}
                    </Box>
                    <DropdownIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            background="connectButtonBackground"
            borderRadius="connectButton"
            transform={{ active: 'shrink', hover: 'grow' }}
            transition="default"
          >
            <Box
              as="button"
              background="connectButtonInnerBackground"
              borderColor={
                connectModalOpen ? 'accentColor' : 'connectButtonBackground'
              }
              borderRadius="connectButton"
              borderStyle="solid"
              borderWidth="2"
              boxShadow="connectButton"
              color="connectButtonText"
              fontFamily="body"
              fontWeight="bold"
              onClick={openConnectModal}
              padding="8"
              type="button"
            >
              Connect Wallet
            </Box>
          </Box>
        );
      }}
    </ConnectButtonRenderer>
  );
}

ConnectButton.__defaultProps = defaultProps;
ConnectButton.Custom = ConnectButtonRenderer;