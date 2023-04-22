import { FieldBase, FieldBaseProps } from 'components/Field/Base';
import React, { useMemo } from 'react';
import { StyleProp, Text, View } from 'react-native';
import { Book, Lightning } from 'phosphor-react-native';
import { ActivityIndicator, Button, Icon } from 'components/design-system-ui';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { toShort } from 'utils/index';
import AvatarGroup from 'components/common/AvatarGroup';
import { FontSemiBold } from 'styles/sharedStyles';

interface Props extends FieldBaseProps {
  outerStyle?: StyleProp<any>;
  value?: string;
  placeholder?: string;
  loading?: boolean;
}

const blockContentStyle: StyleProp<any> = {
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 12,
  paddingRight: 6,
  paddingBottom: 4,
};

const textStyle: StyleProp<any> = {
  fontSize: 14,
  lineHeight: 22,
  ...FontSemiBold,
  color: 'rgba(255, 255, 255, 0.85)',
};

export const ValidatorSelectorField = ({ outerStyle, value, label, placeholder, loading, ...fieldBase }: Props) => {
  const theme = useSubWalletTheme().swThemes;

  const addressList = useMemo(() => {
    if (value) {
      const _addressList: string[] = value.split(',').map(item => {
        const itemInfo = item.split('___');

        return itemInfo[0];
      });

      return _addressList;
    } else {
      return [];
    }
  }, [value]);

  const renderContent = () => {
    if (!value) {
      return <Text style={textStyle}>{placeholder || 'Selected validator'}</Text>;
    }

    const valueList = value.split(',');

    if (valueList.length > 1) {
      return <Text style={textStyle}>{`Selected ${valueList.length} validator`}</Text>;
    }

    return <Text style={textStyle}>{valueList[0].split('___')[1] || toShort(valueList[0].split('___')[0])}</Text>;
  };

  return (
    <FieldBase label={label} fieldBgc={theme.colorBgSecondary} {...fieldBase} outerStyle={outerStyle}>
      <View style={[blockContentStyle, !label && { paddingTop: 12 }]}>
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          {!!addressList.length && (
            <View style={{ paddingRight: 8 }}>
              <AvatarGroup addresses={addressList} />
            </View>
          )}

          {renderContent()}
        </View>

        {loading ? (
          <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={20} indicatorColor={theme.colorWhite} />
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <Button
              size={'xs'}
              type={'ghost'}
              icon={<Icon phosphorIcon={Book} size={'sm'} iconColor={theme.colorTextLight3} />}
            />
            <Button
              size={'xs'}
              type={'ghost'}
              icon={<Icon phosphorIcon={Lightning} size={'sm'} iconColor={theme.colorTextLight3} />}
            />
          </View>
        )}
      </View>
    </FieldBase>
  );
};
