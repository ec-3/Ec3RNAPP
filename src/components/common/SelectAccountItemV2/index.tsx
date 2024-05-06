import React, { useMemo } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Avatar, Button, Icon, Typography } from 'components/design-system-ui';
import { isEthereumAddress } from '@polkadot/util-crypto';
import { useEC3Theme } from 'hooks/useEC3Theme';
import { FontMedium, FontSemiBold } from 'styles/sharedStyles';
import { CheckCircle, Eye, IconProps, PencilSimpleLine, QrCode, Swatches } from 'phosphor-react-native';
import useGetAccountSignModeByAddress from 'hooks/screen/useGetAccountSignModeByAddress';
import { AccountSignMode } from 'types/signer';
import i18n from 'utils/i18n/i18n';
import { toShort } from 'utils/index';
import AvatarGroup from 'components/common/AvatarGroup';

interface Props {
  address: string;
  accountName?: string;
  isSelected?: boolean;
  isAllAccount?: boolean;
  onPressDetailBtn?: () => void;
  onSelectAccount?: (selectAccount: string) => void;
  isShowEditBtn?: boolean;
}

export const SelectAccountItemV2 = ({
  address,
  accountName,
  isSelected,
  isAllAccount,
  onPressDetailBtn,
  onSelectAccount,
  isShowEditBtn = true,
}: Props) => {
  const theme = useEC3Theme().swThemes;
  const signMode = useGetAccountSignModeByAddress(address);
  const accountSignModeIcon = useMemo((): React.ElementType<IconProps> | undefined => {
    switch (signMode) {
      case AccountSignMode.LEDGER:
        return Swatches;
      case AccountSignMode.QR:
        return QrCode;
      case AccountSignMode.READ_ONLY:
        return Eye;
    }

    return undefined;
  }, [signMode]);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 0,
        paddingVertical: 6,
        paddingLeft: 0,
        paddingRight: 0,
        // backgroundColor: theme.colorBgSecondary,
        marginBottom: theme.marginXS,
        borderRadius: theme.borderRadiusLG,
      }}
      onPress={() => onSelectAccount && onSelectAccount(address)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isAllAccount ? (
          <AvatarGroup />
        ) : (
          <Avatar value={address} size={32} theme={isEthereumAddress(address) ? 'ethereum' : 'polkadot'} />
        )}

        <View style={{ paddingLeft: theme.paddingSM, justifyContent: 'center' }}>
          <Typography.Text
            style={{
              fontSize: theme.fontSizeLG,
              lineHeight: theme.fontSizeLG * theme.lineHeightLG,
              ...FontSemiBold,
              maxWidth: 200,
              color: theme.colorWhite,
              paddingRight: theme.paddingXS,
            }}
            ellipsis>
            {isAllAccount ? i18n.common.allAccounts : accountName}
          </Typography.Text>

          {!isAllAccount && (
            <Typography.Text
              style={{
                fontSize: theme.fontSizeSM,
                lineHeight: theme.fontSizeSM * theme.lineHeightSM,
                ...FontMedium,
                color: theme.colorTextTertiary,
                paddingRight: theme.paddingXS,
              }}>
              {toShort(address, 9, 9)}
            </Typography.Text>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isSelected && (
          <View style={{ paddingHorizontal: theme.paddingSM - 2 }}>
          <Image
            source={require('assets/icon_item_select.png')}
            style={{ width: 16, height: 16, }} // 调整宽度、高度和颜色以满足你的需求
          />
          </View>
        )}

        {accountSignModeIcon && (
          <View style={{ paddingHorizontal: theme.paddingSM - 2 }}>
            <Icon phosphorIcon={accountSignModeIcon} size={'sm'} iconColor={theme.colorTextTertiary} />
          </View>
        )}

        {/* {!isAllAccount && isShowEditBtn && (
          <Button
            type={'ghost'}
            size={'xs'}
            icon={<Icon phosphorIcon={PencilSimpleLine} size={'sm'} iconColor={theme.colorTextTertiary} />}
            onPress={onPressDetailBtn}
          />
        )} */}
      </View>
    </TouchableOpacity>
  );
};
