import React from 'react';
import { View } from 'react-native';
import { CommonTransactionInfo } from 'components/common/Confirmation/CommonTransactionInfo';
import { BaseTransactionConfirmationProps } from 'screens/Confirmations/Transaction/variants/Base';
import { RequestStakePoolingUnbonding } from '@subwallet/extension-base/background/KoniTypes';
import useGetNativeTokenBasicInfo from 'hooks/useGetNativeTokenBasicInfo';
import MetaInfo from 'components/MetaInfo';

type Props = BaseTransactionConfirmationProps;

const LeavePoolTransactionConfirmation = ({ transaction }: Props) => {
  const data = transaction.data as RequestStakePoolingUnbonding;
  const { decimals, symbol } = useGetNativeTokenBasicInfo(transaction.chain);

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
      <CommonTransactionInfo address={transaction.address} network={transaction.chain} />

      <MetaInfo style={{ marginTop: 12 }} hasBackgroundWrapper>
        <MetaInfo.Number decimals={decimals} label={'Unbond amount'} suffix={symbol} value={data.amount} />
        <MetaInfo.Number
          decimals={decimals}
          label={'Estimated fee'}
          suffix={symbol}
          value={transaction.estimateFee?.value || 0}
        />
      </MetaInfo>
    </View>
  );
};

export default LeavePoolTransactionConfirmation;
